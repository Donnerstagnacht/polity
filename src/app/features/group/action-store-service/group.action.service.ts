import {Injectable} from '@angular/core';
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {supabaseAuthenticatedClient} from "../../../auth/supabase-authenticated-client";
import {GroupStoreService} from "./group.store.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class GroupActionService {
    private readonly supabase: SupabaseClient<DatabaseOverwritten> = supabaseAuthenticatedClient;

    constructor(
        private readonly groupStoreService: GroupStoreService
    ) {
    }

    /**
     * Retrieves a group by its ID and sets it in the group store.
     *
     * @param {string} id - The ID of the group to retrieve.
     * @return {Promise<void>}
     */
    public async readGroup(id: string): Promise<void> {
        await this.groupStoreService.group.wrapSelectFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_group'>> = await this.supabase
            .rpc('read_group', {_group_id: id})
            .single()
            .throwOnError()
            if (response.data) {
                // const imgPath = await this.supabase.storage.from('profile_images').createSignedUrl(response.data.profile_image, 3600 * 24 * 7);
                // response.data.profile_image = imgPath.data?.signedUrl as string;
                if (response.data) {
                    this.groupStoreService.group.setObject(response.data);
                    console.log(response.data)
                }
            }
        })
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
}
