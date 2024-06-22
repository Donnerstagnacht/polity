import {AuthenticatedSchema, SupabaseObjectReturn} from '../../supabase/types/supabase.authenticated.shorthand-types';
import {supabaseAuthenticatedClient} from '../app/auth/supabase-authenticated-client';
import {TuiFileLike} from '@taiga-ui/kit';
import {DatabaseAuthenticatedOverwritten} from '../../supabase/types/supabase.authenticated.modified';

/**
 * Retrieves a signed URL for an image in a Supabase object.
 *
 * @param {SupabaseObjectReturn<FunctionName>} resultDataIn - The Supabase object data.
 * @param {string} bucket - The bucket where the image is stored.
 * @param {keyof SupabaseObjectReturn<FunctionName>} key - The key of the image in the Supabase object.
 * @return {Promise<SupabaseObjectReturn<FunctionName>>} The Supabase object with the signed image URL.
 */
export async function getSignedUrlFromSupabaseObject<FunctionName extends keyof AuthenticatedSchema['Functions']>(
    resultDataIn: SupabaseObjectReturn<FunctionName>,
    bucket: string,
    key: keyof SupabaseObjectReturn<FunctionName>
): Promise<SupabaseObjectReturn<FunctionName>> {
    const imgPath: string = getImagePath(resultDataIn, key);
    const signedImgUrl: string | undefined = await getSignedImageUrl(imgPath, bucket);

    if (signedImgUrl !== undefined) {
        const mergedResultData = replaceImageUrl(
            resultDataIn,
            signedImgUrl,
            key
        );
        return mergedResultData;
    } else {
        return resultDataIn;
    }
    
}

/**
 * Retrieves signed URLs for an array of image data from Supabase.
 *
 * @param {DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns']} data - The image data from Supabase.
 * @param {string} bucket - The bucket where the images are stored.
 * @param {keyof SupabaseObjectReturn<FunctionName>} key - The key of the image in the Supabase object.
 * @return {Promise<DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns']> } The image data with signed URLs.
 */
export async function getSignedUrlFromSupabaseArray<FunctionName extends keyof AuthenticatedSchema['Functions']>(
    data: DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns'],
    bucket: string,
    key: keyof SupabaseObjectReturn<FunctionName>
): Promise<DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns']> {
    const imgPaths: string[] = getImagePaths(data as any, key as string);
    const signedImgUrls: string[] | undefined = await getSignedImageUrls(
        imgPaths,
        bucket
    );

    if (signedImgUrls !== undefined) {
        const mergedResultData = replaceImageUrls(
            data,
            signedImgUrls,
            key
        );
        return mergedResultData;
    } else {
        return data;
    }

}

function getImagePath<FunctionName extends keyof AuthenticatedSchema['Functions']>(
    group: SupabaseObjectReturn<FunctionName>,
    key: keyof SupabaseObjectReturn<FunctionName>
): string {
    return group[key] as string;
}

function getImagePaths<FunctionName extends keyof AuthenticatedSchema['Functions']>(
    groups: DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns'],
    key: keyof SupabaseObjectReturn<FunctionName>
): string[] {
    return groups.map((group: SupabaseObjectReturn<FunctionName>) => group[key]);
}

function replaceImageUrls<FunctionName extends keyof AuthenticatedSchema['Functions']>(
    groups: DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns'],
    newUrls: string[],
    key: keyof SupabaseObjectReturn<FunctionName>
): DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns'] {
    if (groups.length !== newUrls.length) {
        throw new Error('The length of the groups array and newUrls array must be the same.');
    }

    return groups.map((group: DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns'], index: number) => ({
        ...group,
        [key]: newUrls[index]
    }));
}

function replaceImageUrl<FunctionName extends keyof AuthenticatedSchema['Functions']>(
    group: SupabaseObjectReturn<FunctionName>,
    newUrl: string,
    key: keyof SupabaseObjectReturn<FunctionName>
): SupabaseObjectReturn<FunctionName> {
    return {
        // @ts-ignore
        ...group,
        [key]: newUrl
    };
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
    imgFileNames: string[],
    bucket: string
): Promise<string[] | undefined> {
    const supabase = supabaseAuthenticatedClient;
    const signedImgUrlsObject: {
        data: { error: string | null; path: string | null; signedUrl: string }[];
        error: null
    } | {
        data: null;
        error: any // StorageError - why no type support?
    } = await supabase.storage
                      .from(bucket)
                      .createSignedUrls(imgFileNames, 3600 * 24 * 7);
    const signedImageUrlsAsStrings: string[] | undefined = signedImgUrlsObject.data?.map((obj: {
        error: string | null;
        path: string | null;
        signedUrl: string
    }) => obj.signedUrl);
    return signedImageUrlsAsStrings;
}

export async function getSignedImageUrl(
    imgFileName: string,
    bucket: string
): Promise<string | undefined> {
    const supabase = supabaseAuthenticatedClient;
    const signedImgUrlObject: { data: { signedUrl: string }; error: null } | {
        data: null;
        error: any // StorageError - why no type support?
    } = await supabase.storage
                      .from(bucket)
                      .createSignedUrl(
                          imgFileName,
                          3600 * 24 * 7
                      );
    return signedImgUrlObject.data?.signedUrl;
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
