import {
    AuthenticatedSchema,
    SupabaseObjectReturn
} from '../../../supabase/types/supabase.authenticated.shorthand-types';
import {WritableSignal} from '@angular/core';
import {PostgrestResponseFailure, PostgrestResponseSuccess} from '@supabase/postgrest-js';
import {supabaseAuthenticatedClient} from '../auth/supabase-authenticated-client';
import {TuiFileLike} from '@taiga-ui/kit';

/**
 * Retrieves a signed URL of an supabase object from a Supabase bucket.
 *
 * @param {WritableSignal<PostgrestResponseSuccess<SupabaseObjectReturn<FunctionName>> | PostgrestResponseFailure>} resultDataIn - The signal containing the result data.
 * @param {string} bucket - The name of the bucket.
 * @param {keyof SupabaseObjectReturn<FunctionName>} key - The key of the object in the result data.
 * @return {Promise<void>} A promise that resolves when the signed URL is retrieved and applied to the result data.
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
 * @param {string} path - The file path.
 * @param {string} bucket - The bucket name.
 * @returns {Promise<string | undefined>} The signed URL to the image file.
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
 * Retrieves signed URLs for a list of image file names.
 *
 * @param {string[]} imgFileNames - An array of image file names.
 * @returns {Promise<string[] | undefined>} - A promise that resolves to an array of signed URLs, or undefined if an error occurs.
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
 * Uploads an image file to a specified bucket using Supabase's storage API.
 *
 * @param {string} filePath - The path where the image file will be stored in the bucket.
 * @param {string} bucket - The name of the bucket where the image file will be uploaded.
 * @param {TuiFileLike} file - The image file to be uploaded.
 * @return {Promise<{data: {path: string}, error: null} | {data: null, error: Error}>} A promise that resolves to an object containing the path of the uploaded image file and a null error, or an object containing a null data and an error if the upload fails.
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
