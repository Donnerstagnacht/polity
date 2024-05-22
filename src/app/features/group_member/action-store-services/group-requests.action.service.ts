import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {supabaseClient} from "../../../auth/supabase-client";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {GroupStoreService} from "../../group/action-store-service/group.store.service";
import {GroupRequestsStoreService} from "./group-requests.store.service";

@Injectable({
    providedIn: 'root'
})
export class GroupRequestsActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private readonly groupStoreService: GroupStoreService,
        private readonly groupRequestsStoreService: GroupRequestsStoreService,
    ) {
    }

    public async readGroupRequests(): Promise<void> {
        await this.groupRequestsStoreService.groupRequests.wrapSelectFunction(async (): Promise<void> => {
            const groupId: string | null = this.groupStoreService.group.getObjectId();
            if (groupId) {
                const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_group_member_requests'>[]> = await this.supabaseClient.rpc(
                    'read_group_member_requests',
                    {
                        group_id_in: groupId
                    }
                )
                .throwOnError()
                if (response.data) {
                    this.groupRequestsStoreService.groupRequests.setObjects(response.data)
                }
            }
        })
    }
}