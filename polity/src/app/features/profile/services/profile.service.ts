import {Injectable, WritableSignal} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {Profile} from "../types-and-interfaces/profile";
import {ProfileStoreService} from "./profile-store.service";
import {ErrorStoreService} from "../../../core/services/error-store.service";
import {TuiFileLike} from "@taiga-ui/kit";
import {SessionStoreService} from "../../../core/services/session-store.service";
import {supabaseClient} from "../../../core/services/supabase-client";
import {DatabaseModified} from "../../../../../supabase/types/supabase.modified";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private supabase: SupabaseClient<DatabaseModified> = supabaseClient

    constructor(
        private readonly profileStoreService: ProfileStoreService,
        private readonly notificationService: ErrorStoreService,
        private readonly sessionStoreService: SessionStoreService
    ) {
    }

    /**
     * Retrieves a profile by its ID and sets it in the profile store.
     *
     * @param {string} id - The ID of the profile to retrieve.
     * @return {Promise<void>}
     */
    public async selectProfile(id: string): Promise<PostgrestSingleResponse<Profile>> {
        try {
            const response: PostgrestSingleResponse<Profile> = await this.supabase
            .from('profiles')
            .select(`id, username, first_name, last_name, profile_image`)
            .eq('id', id)
            .single()
            .throwOnError();
            if (response.data) {
                this.profileStoreService.profile.mutateEntity(response.data);
            }
            // this.profileStoreService.setProfile(response.data);
            return response;
        } catch (error: any) {
            this.notificationService.updateError(error.message, true);
            return error
        }
    }

    /**
     * Updates the profile  of the authenticated user.
     *
     * @param {Profile} profile - The profile object containing the updated information.
     * @return {Promise<void>}
     */
    public async updateProfile(profile: Profile): Promise<void> {
        const sessionId: string | null = this.sessionStoreService.sessionId();

        try {
            if (sessionId) {
                const update: Profile = {
                    ...profile,
                    updated_at: new Date(),
                    id: sessionId
                }
                if (update.id) {
                }
                const databaseResponse: PostgrestSingleResponse<null> = await this.supabase.from('profiles').upsert(update)

                if (databaseResponse.error) throw databaseResponse.error

                this.profileStoreService.profile.mutateEntity(profile)
                // this.profileStoreService.setProfile(profile);
            } else {
                throw new Error('no session')
            }
        } catch (error) {
            if (error instanceof Error) {
                this.notificationService.updateError(error.message, true);
            }
        }
    }

    /**
     * Updates the profile image URL for the user stored in profile store.
     *
     * @param {string} imageUrl - The URL of the new profile image.
     * @return {Promise<void>}
     */
    async updateProfileImage(imageUrl: string): Promise<void> {
        const profileToUpdate: WritableSignal<Profile | null> = this.profileStoreService.profile.selectEntity();
        // const profileToUpdate: WritableSignal<Profile | null> = this.profileStoreService.selectProfile();
        const id: string | null | undefined = profileToUpdate()?.id;

        await this.supabase
        .from('profiles')
        .update({profile_image: imageUrl})
        .eq('id', id as string);
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
