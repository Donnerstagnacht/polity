import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GroupInvitationsActionService {
    // private readonly supabaseClient = supabaseAuthenticatedClient;
    //     //
    //     // constructor(
    //     //     private readonly groupStoreService: GroupStoreService,
    //     //     private readonly groupInvitationsStoreService: GroupInvitationsStoreService,
    //     // ) {
    //     // }

    // public async readGroupInvitations(): Promise<void> {
    //     const groupId: string | null = this.groupStoreService.group.getObjectId();
    //     if (groupId) {
    //         const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_group_member_invitations'>[]> = await this.groupInvitationsStoreService.groupInvitations.manageSelectApiCall(async () => {
    //             return this.supabaseClient.rpc(
    //                 'read_group_member_invitations',
    //                 {
    //                     _group_id: groupId
    //                 }
    //             )
    //         })
    //         if (response.data) {
    //             this.groupInvitationsStoreService.groupInvitations.setObjects(response.data)
    //         }
    //     }
    // }
}
