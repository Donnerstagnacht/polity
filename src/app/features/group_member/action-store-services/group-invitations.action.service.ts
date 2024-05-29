import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {GroupInvitationsStoreService} from "./group-invitations.store.service";
import {GroupStoreService} from "../../group/action-store-service/group.store.service";
import {DatabasePublicOverwritten} from "../../../../../supabase/types/supabase.public.modified";
import {supabaseAuthenticatedClient} from "../../../auth/supabase-authenticated-client";

@Injectable({
    providedIn: 'root'
})
export class GroupInvitationsActionService {
    private readonly supabaseClient: SupabaseClient<DatabasePublicOverwritten> = supabaseAuthenticatedClient;

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
                        _group_id: groupId
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
