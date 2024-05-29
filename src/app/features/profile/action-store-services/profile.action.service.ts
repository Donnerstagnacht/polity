import {Injectable} from '@angular/core';
import {PostgrestSingleResponse} from "@supabase/supabase-js";
import {ProfileStoreService} from "./profile.store.service";
import {TuiFileLike} from "@taiga-ui/kit";
import {supabaseAuthenticatedClient} from "../../../auth/supabase-authenticated-client";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class ProfileActionService {
    private supabase = supabaseAuthenticatedClient

    constructor(
        private readonly profileStoreService: ProfileStoreService
    ) {
    }

    /**
     * Retrieves a profile by its ID and sets it in the profile store.
     *
     * @param {string} id - The ID of the profile to retrieve.
     * @return {Promise<void>}
     */
    public async readProfile(id: string): Promise<void> {
        await this.profileStoreService.profile.wrapSelectFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_profile'>> = await this.supabase
            .rpc('read_profile', {_user_id: id})
            .single()
            .throwOnError()
            if (response.data) {
                const imgPath = await this.supabase.storage.from('profile_images').createSignedUrl(response.data.profile_image_, 3600 * 24 * 7);
                response.data.profile_image_ = imgPath.data?.signedUrl as string;
                this.profileStoreService.profile.setObject(response.data);
            }
        })
    }

    /**
     * Updates the profile  of the authenticated user.
     *
     * @param {Profile} profile - The profile object containing the updated information.
     * @return {Promise<void>}
     */
    public async updateProfile(profile: SupabaseObjectReturn<'read_profile'>): Promise<void> {
        await this.profileStoreService.profile.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'update_profile'>> = await this.supabase
            .rpc('update_profile', {
                _first_name: profile.first_name_,
                _last_name: profile.last_name_,
                _profile_image: profile.profile_image_
            })
            .single()
            .throwOnError()
            if (response.error) throw response.error
            this.profileStoreService.profile.mutateObject(profile)
        }, true, 'Successful Updated your profile!')
    }

    /**
     * Updates the profile image URL for the user stored in profile store.
     *
     * @param {string} imageUrl - The URL of the new profile image.
     * @return {Promise<void>}
     */
    async updateProfileImage(imageUrl: string): Promise<void> {
        await this.profileStoreService.profile.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'update_profile'>> = await this.supabase
            .rpc('update_profile', {
                _profile_image: imageUrl
            })
            .single()
            .throwOnError()
            if (response.error) throw response.error
        }, true, 'Successful Updated your profile image!')
    }

    /**
     * Retrieves the public URL of a file in the 'profile_images' bucket.
     *
     * @param {string} path - The path of the file.
     * @return {{data: {publicUrl: string}}} - The public URL of the file.
     */
    getPublicUrl(path: string): {
        data: {
            publicUrl: string
        }
    } {
        console.log('pathToPublicUrl', path)
        return this.supabase.storage.from('profile_images').getPublicUrl(path);
    }

    /**
     * Retrieves a private image URL for a given image file name.
     *
     * @param {string} imgFileName - The file name.
     * @returns {Promise<string | undefined>} The signed url to the img.
     *          It returns undefined if an error occurred.
     */
    public async getSignedImageUrl(imgFileName: string): Promise<string | undefined> {
        const privateUrlObject: { data: { signedUrl: string }; error: null } | {
            data: null;
            error: any
        } = await this.supabase.storage.from('profile_images').createSignedUrl(imgFileName, 3600 * 24 * 7);
        const urlAsString: string | undefined = privateUrlObject.data?.signedUrl;
        return urlAsString;
    }

    /**
     * Retrieves private URLs for the given image File names.
     *
     * @param {string[]} imgFileNames - The paths of the images.
     * @returns {Promise<string[] | undefined>} - A promise that resolves to an array of signed image URLs or
     * undefined if there was an error.
     */
    public async getSignedImageUrls(imgFileNames: string[]): Promise<string[] | undefined> {
        const signedImgUrlsObject: {
            data: { error: string | null; path: string | null; signedUrl: string }[];
            error: null
        } | {
            data: null;
            error: any // StorageError - why no type support?
        } = await this.supabase.storage.from('profile_images').createSignedUrls(imgFileNames, 3600 * 24 * 7);
        const signedImageUrlsAsStrings: string[] | undefined = signedImgUrlsObject.data?.map((obj: {
            error: string | null;
            path: string | null;
            signedUrl: string
        }) => obj.signedUrl)
        return signedImageUrlsAsStrings;
    }

    /**
     * Transforms image names to URLs.
     *
     * @param {Array<Object>} objectArray - The input array of objects including a property that holds the image
     * file name.
     * @param {string} key - The key holding the image file name in each object.
     * @return Promise<Array<Object> The promise containing the transformed array of
     * objects. The key property holds the img url instead the img file name now.
     */
    public async transformImageNamesToUrls<storedObject extends object>(
        objectArray: storedObject[],
        key: keyof storedObject): Promise<storedObject[]> {
        const imgNames: string[] = objectArray.map((obj: storedObject) => obj[key]) as string[];
        const imgPaths: string[] = await this.getSignedImageUrls(imgNames) as string[];

        const finalArray: storedObject[] = objectArray.map((obj: storedObject, index: number) => ({
            ...obj,
            profile_image: imgPaths[index]
        }));
        return finalArray;
    }


    /**
     * Uploads an image file to the specified file path in the Supabase storage.
     *
     * @param {string} filePath - The path where the file will be uploaded.
     * @param {TuiFileLike} file - The file to be uploaded.
     * @return {Promise<{data: {path: string}, error: null} | {data: null, error: any}>}
     */
    public uploadImage(filePath: string, file: TuiFileLike): Promise<{
        data: {
            path: string
        },
        error: null
    } | {
        data: null,
        error: Error
    }> {
        const fileIn: File = file as File;
        return this.supabase
        .storage
        .from('profile_images')
        .upload(filePath, fileIn)
    }
}
