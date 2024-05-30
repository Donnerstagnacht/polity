import {Injectable} from '@angular/core';
import {PostgrestSingleResponse} from "@supabase/supabase-js";
import {supabaseAuthenticatedClient} from "../../../auth/supabase-authenticated-client";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {GroupStoreService} from "../../group/action-store-service/group.store.service";
import {GroupRequestsStoreService} from "./group-requests.store.service";

@Injectable({
    providedIn: 'root'
})
export class GroupRequestsActionService {
    private readonly supabaseClient = supabaseAuthenticatedClient;

    constructor(
        private readonly groupStoreService: GroupStoreService,
        private readonly groupRequestsStoreService: GroupRequestsStoreService,
    ) {
    }

    public async readGroupRequests(): Promise<void> {
        const groupId: string | null = this.groupStoreService.group.getObjectId();
        if (groupId) {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_group_member_requests'>[]> = await this.groupRequestsStoreService.groupRequests.manageSelectApiCall(async () => {
                return this.supabaseClient.rpc(
                    'read_group_member_requests',
                    {
                        _group_id: groupId
                    }
                )
            })
            if (response.data) {
                this.groupRequestsStoreService.groupRequests.setObjects(response.data)
            }
        }
    }
}
