import {Injectable, WritableSignal} from '@angular/core';
import {createClient, PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {environment} from "../../../../environments/environment";
import {Profile} from "../types-and-interfaces/profile";
import {ProfileStoreService} from "./profile-store.service";
import {NotificationsStoreService} from "../../../core/services/notifications-store.service";
import {TuiFileLike} from "@taiga-ui/kit";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private supabase: SupabaseClient

    constructor(
        private readonly profileStoreService: ProfileStoreService,
        private readonly notificationService: NotificationsStoreService
    ) {
        this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
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
            .select(`id, username, website, avatar_url, first_name, last_name, profile_image`)
            .eq('id', id)
            .single()
            .throwOnError();
            this.profileStoreService.setProfile(response.data);
            return response;
        } catch (error: any) {
            this.notificationService.updateNotification(error.message, true);
            return error
        }
    }

    /**
     * Updates the profile information in the 'profiles' table.
     *
     * @param {Profile} profile - The profile object containing the updated information.
     * @return {Promise<Profile>} A promise that resolves to the updated profile object.
     */
    public updateProfile(profile: Profile) {
        const update: Profile = {
            ...profile,
            updated_at: new Date(),
        }
        return this.supabase.from('profiles').upsert(update)
    }

    /**
     * Updates the profile image URL for the user stored in profile store.
     *
     * @param {string} imageUrl - The URL of the new profile image.
     * @return {Promise<void>}
     */
    async updateProfileImage(imageUrl: string): Promise<void> {
        const profileToUpdate: WritableSignal<Profile | null> = this.profileStoreService.selectProfile();
        const id: string | undefined = profileToUpdate()?.id;

        await this.supabase
        .from('profiles')
        .update({profile_image: imageUrl})
        .eq('id', id);
    }

    /**
     * Retrieves the public URL of a file in the 'profile_images' bucket.
     *
     * @param {string} path - The path of the file.
     * @return {{data: {publicUrl: string}}} - The public URL of the file.
     */
    getPublicBucket(path: string): { data: { publicUrl: string } } {
        return this.supabase.storage.from('profile_images').getPublicUrl(path);
    }

    /**
     * Uploads an image file to the specified file path in the Supabase storage.
     *
     * @param {string} filePath - The path where the file will be uploaded.
     * @param {TuiFileLike} file - The file to be uploaded.
     * @return {Promise<{data: {path: string}, error: null} | {data: null, error: any}>}
     */
    public uploadImage(filePath: string, file: TuiFileLike): Promise<{ data: { path: string }, error: null } | {
        data: null,
        error: Error
    }> {
        const fileIn: File = file as File;
        return this.supabase
        .storage
        .from('profile_images')
        .upload(filePath, fileIn)
    }

    /**
     * Retrieves a profile from the database without updating the local store.
     *
     * @param {string} id - The ID of the profile to retrieve.
     * @return {Promise<PostgrestSingleResponse<Profile>>} A promise that resolves to the retrieved profile.
     */
    public async returnProfileNoStoreUpdate(id: string): Promise<PostgrestSingleResponse<Profile>> {
        try {
            const response: PostgrestSingleResponse<Profile> = await this.supabase
            .from('profiles')
            .select(`id, username, website, avatar_url, first_name, last_name, profile_image`)
            .eq('id', id)
            .single()
            .throwOnError();
            return response;
        } catch (error: any) {
            this.notificationService.updateNotification(error.message, true);
            return error;
        }
    }

}
