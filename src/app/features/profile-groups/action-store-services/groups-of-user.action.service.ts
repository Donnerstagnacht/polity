import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {GroupsOfUserStoreService} from "./groups-of-user.store.service";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {supabasePublicClient} from "../../../auth/supabase-public-client";

@Injectable({
    providedIn: 'root'
})
export class GroupsOfUserActionService {
    private readonly supabase: SupabaseClient<DatabaseOverwritten> = supabasePublicClient;

    constructor(
        private readonly groupsOfUserStoreService: GroupsOfUserStoreService
    ) {
    }

    public async readGroupsOfUser(): Promise<void> {
        await this.groupsOfUserStoreService.groupsOfUser.wrapSelectFunction(async (): Promise<void> => {
            this.groupsOfUserStoreService.groupsOfUser.loading.startLoading();
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_groups_of_user'>[]> = await this.supabase
            .rpc('read_groups_of_user')
            .throwOnError()
            if (response.data) {
                // const imgPath = await this.supabase.storage.from('profile_images').createSignedUrl(response.data.profile_image, 3600 * 24 * 7);
                // response.data.profile_image = imgPath.data?.signedUrl as string;
                if (response.data) {
                    // this.groupStoreService.group.setObject(response.data);
                    console.log(response.data)
                    this.groupsOfUserStoreService.groupsOfUser.setObjects(response.data);
                    this.groupsOfUserStoreService.groupsOfUser.loading.stopLoading();
                }
            }
        })
    }

}
