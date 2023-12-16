import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {Profile} from "../../../../../cypress/fixtures/profile";
import {ProfileStoreService} from "./profile.store.service";
import {TuiFileLike} from "@taiga-ui/kit";
import {SessionStoreService} from "../../../auth/services/session.store.service";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {supabaseClient} from "../../../auth/supabase-client";
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class ProfileActionService {
    private supabase: SupabaseClient<DatabaseOverwritten> = supabaseClient

    constructor(
        private readonly profileStoreService: ProfileStoreService,
        private readonly sessionStoreService: SessionStoreService
    ) {
    }

    /**
     * Retrieves a profile by its ID and sets it in the profile store.
     *
     * @param {string} id - The ID of the profile to retrieve.
     * @return {Promise<void>}
     */
    public async selectProfile(id: string): Promise<void> {
        await this.profileStoreService.profile.wrapSelectFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<FunctionSingleReturn<'select_user'>> = await this.supabase
            .rpc('select_user', {user_id: id})
            .single()
            .throwOnError()
            if (response.data) {
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
    public async updateProfile(profile: Profile): Promise<void> {
        await this.profileStoreService.profile.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<FunctionSingleReturn<'update_user'>> = await this.supabase
            .rpc('update_user', {
                username_in: profile.username as string,
                first_name_in: profile.first_name as string,
                last_name_in: profile.last_name as string,
                profile_image_in: profile.profile_image as string
            })
            .single()
            .throwOnError()
            if (response.error) throw response.error
            this.profileStoreService.profile.mutateObject(profile)
        })
    }

    /**
     * Updates the profile image URL for the user stored in profile store.
     *
     * @param {string} imageUrl - The URL of the new profile image.
     * @return {Promise<void>}
     */
    async updateProfileImage(imageUrl: string): Promise<void> {
        await this.profileStoreService.profile.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<FunctionSingleReturn<'update_user'>> = await this.supabase
            .rpc('update_user', {
                profile_image_in: imageUrl
            })
            .single()
            .throwOnError()
            if (response.error) throw response.error
        })
    }

    /**
     * Retrieves the public URL of a file in the 'profile_images' bucket.
     *
     * @param {string} path - The path of the file.
     * @return {{data: {publicUrl: string}}} - The public URL of the file.
     */
    getPublicBucket(path: string): {
        data: {
            publicUrl: string
        }
    } {
        return this.supabase.storage.from('profile_images').getPublicUrl(path);
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
