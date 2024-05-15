import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {supabaseClient} from "../../../auth/supabase-client";
import {GroupRequestsOfUserStoreService} from "./group-requests-of-user.store.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class GroupRequestsOfUserActionService {
    private readonly supabase: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private readonly groupRequestsOfUserStoreService: GroupRequestsOfUserStoreService
    ) {
    }

    public async readGroupRequestsOfUser(): Promise<void> {
        await this.groupRequestsOfUserStoreService.groupRequestsOfUser.wrapSelectFunction(async (): Promise<void> => {
            this.groupRequestsOfUserStoreService.groupRequestsOfUser.loading.startLoading();
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_group_requests_of_user'>[]> = await this.supabase
            .rpc('read_group_requests_of_user')
            .throwOnError()
            if (response.data) {
                // const imgPath = await this.supabase.storage.from('profile_images').createSignedUrl(response.data.profile_image, 3600 * 24 * 7);
                // response.data.profile_image = imgPath.data?.signedUrl as string;
                if (response.data) {
                    // this.groupStoreService.group.setObject(response.data);
                    console.log(response.data)
                    this.groupRequestsOfUserStoreService.groupRequestsOfUser.setObjects(response.data);
                    this.groupRequestsOfUserStoreService.groupRequestsOfUser.loading.stopLoading();
                }
            }
        })
    }
}
