import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {Profile} from "../types-and-interfaces/profile";
import {ProfileStoreService} from "./profile-store.service";
import {TuiFileLike} from "@taiga-ui/kit";
import {SessionStoreService} from "../../../core/services/session-store.service";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {supabaseClient} from "../../../shared/services/supabase-client";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
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
            const response: PostgrestSingleResponse<Profile> = await this.supabase
            .from('profiles')
            .select(`id, username, first_name, last_name, profile_image`)
            .eq('id', id)
            .single()
            .throwOnError();
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
        const sessionId: string | null = this.sessionStoreService.getSessionId();

        await this.profileStoreService.profile.wrapUpdateFunction(async (): Promise<void> => {
            if (sessionId) {
                const update: Profile = {
                    ...profile,
                    updated_at: new Date(),
                    id: sessionId
                }
                const databaseResponse: PostgrestSingleResponse<null> = await this.supabase.from('profiles').upsert(update)
                if (databaseResponse.error) throw databaseResponse.error
                this.profileStoreService.profile.mutateObject(profile)
            } else {
                throw new Error('no session')
            }
        })
    }

    /**
     * Updates the profile image URL for the user stored in profile store.
     *
     * @param {string} imageUrl - The URL of the new profile image.
     * @return {Promise<void>}
     */
    async updateProfileImage(imageUrl: string): Promise<void> {
        const id = this.profileStoreService.profile.getValueByKey('id')
        this.profileStoreService.profile.wrapUpdateFunction(async (): Promise<void> => {
            await this.supabase
            .from('profiles')
            .update({profile_image: imageUrl})
            .eq('id', id as string);
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
        this.profileStoreService.profile
        const fileIn: File = file as File;
        return this.supabase
        .storage
        .from('profile_images')
        .upload(filePath, fileIn)
    }
}
