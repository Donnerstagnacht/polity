import {
    AuthenticatedSchema,
    SupabaseObjectReturn
} from '../../../../supabase/types/supabase.authenticated.shorthand-types';
import {WritableSignal} from '@angular/core';
import {PostgrestResponseFailure, PostgrestResponseSuccess} from '@supabase/postgrest-js';
import {supabaseAuthenticatedClient} from '../../auth/supabase-authenticated-client';
import {TuiFileLike} from '@taiga-ui/kit';

/**
 * Retrieves private URLs for the given image File names.
 *
 * @param {string[]} imgFileNames - The paths of the images.
 * @returns {Promise<string[] | undefined>} - A promise that resolves to an array of signed image URLs or
 * undefined if there was an error.
 */
export async function getSignedUrlFromSupabaseObject<FunctionName extends keyof AuthenticatedSchema['Functions']>(
    resultDataIn: WritableSignal<PostgrestResponseSuccess<SupabaseObjectReturn<FunctionName>> | PostgrestResponseFailure>,
    bucket: string,
    key: keyof SupabaseObjectReturn<FunctionName>
): Promise<void> {
    const supabase = supabaseAuthenticatedClient;
    const resultData = resultDataIn().data;
    if (resultData !== null && resultData !== undefined) {
        const imgPath = await supabase.storage
                                      .from(bucket)
                                      .createSignedUrl(
                                          resultData[key] as string,
                                          3600 * 24 * 7
                                      );
        const signedImgUrl = imgPath.data?.signedUrl;
        if (signedImgUrl !== undefined) {
            // @ts-ignore
            resultData[key] = signedImgUrl;
            // @ts-ignore
            this.data_.set(resultData);
        }
    }
}

/**
 * Retrieves a private image URL for a given image file from a path.
 *
 * @param {string} imgFileName - The file name.
 * @returns {Promise<string | undefined>} The signed url to the img.
 *          It returns undefined if an error occurred.
 */
export async function getSignedUrlFromPath(
    path: string,
    bucket: string
): Promise<string | undefined> {
    const supabase = supabaseAuthenticatedClient;
    const imgPath = await supabase.storage
                                  .from(bucket)
                                  .createSignedUrl(
                                      path as string,
                                      3600 * 24 * 7
                                  );
    const signedImgUrl = imgPath.data?.signedUrl;
    return signedImgUrl;
}

/**
 * Retrieves private URLs for the given image File names.
 *
 * @param {string[]} imgFileNames - The paths of the images.
 * @returns {Promise<string[] | undefined>} - A promise that resolves to an array of signed image URLs or
 * undefined if there was an error.
 */
export async function getSignedImageUrls(
    imgFileNames: string[]
): Promise<string[] | undefined> {
    const supabase = supabaseAuthenticatedClient;
    const signedImgUrlsObject: {
        data: { error: string | null; path: string | null; signedUrl: string }[];
        error: null
    } | {
        data: null;
        error: any // StorageError - why no type support?
    } = await supabase.storage.from('profile_images').createSignedUrls(imgFileNames, 3600 * 24 * 7);
    const signedImageUrlsAsStrings: string[] | undefined = signedImgUrlsObject.data?.map((obj: {
        error: string | null;
        path: string | null;
        signedUrl: string
    }) => obj.signedUrl);
    return signedImageUrlsAsStrings;
}

/**
 * Uploads an image file to the specified file path in the Supabase storage.
 *
 * @param {string} filePath - The path where the file will be uploaded.
 * @param {TuiFileLike} file - The file to be uploaded.
 * @return {Promise<{data: {path: string}, error: null} | {data: null, error: any}>}
 */
export function uploadImage(
    filePath: string,
    bucket: string,
    file: TuiFileLike
): Promise<{
    data: {
        path: string
    },
    error: null
} | {
    data: null,
    error: Error
}> {
    const supabase = supabaseAuthenticatedClient;
    const fileIn: File = file as File;
    return supabase.storage
                   .from(bucket)
                   .upload(filePath, fileIn);
}
