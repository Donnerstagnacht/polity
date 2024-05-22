import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {GroupInvitationsStoreService} from "./group-invitations.store.service";
import {GroupStoreService} from "../../group/action-store-service/group.store.service";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {supabaseClient} from "../../../auth/supabase-client";

@Injectable({
    providedIn: 'root'
})
export class GroupInvitationsActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private readonly groupStoreService: GroupStoreService,
        private readonly groupInvitationsStoreService: GroupInvitationsStoreService,
    ) {
    }

    public async readGroupInvitations(): Promise<void> {
        await this.groupInvitationsStoreService.groupInvitations.wrapSelectFunction(async (): Promise<void> => {
            const groupId: string | null = this.groupStoreService.group.getObjectId();
            if (groupId) {
                const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_group_member_invitations'>[]> = await this.supabaseClient.rpc(
                    'read_group_member_invitations',
                    {
                        group_id_in: groupId
                    }
                )
                .throwOnError()
                if (response.data) {
                    this.groupInvitationsStoreService.groupInvitations.setObjects(response.data)
                }
            }
        })
    }
}