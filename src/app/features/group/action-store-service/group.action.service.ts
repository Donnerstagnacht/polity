import {Injectable} from '@angular/core';
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {supabaseClient} from "../../../auth/supabase-client";
import {GroupStoreService} from "./group.store.service";
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class GroupActionService {
    private readonly supabase: SupabaseClient<DatabaseOverwritten> = supabaseClient;

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
        console.log(id)
        await this.groupStoreService.group.wrapSelectFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<FunctionSingleReturn<'read_group_groups_no_variable'>> = await this.supabase
            .rpc('read_group_groups_no_variable', {group_id: id})
            .single()
            .throwOnError()
            console.log('response', response)
            if (response.data) {
                // console.log('response data', response.data)
                // const imgPath = await this.supabase.storage.from('profile_images').createSignedUrl(response.data.profile_image, 3600 * 24 * 7);
                // response.data.profile_image = imgPath.data?.signedUrl as string;
                // if (response.data) {
                //     this.groupStoreService.group.setObject(response.data);
                //     console.log(response.data)
                // }
            }
        })
    }
}
