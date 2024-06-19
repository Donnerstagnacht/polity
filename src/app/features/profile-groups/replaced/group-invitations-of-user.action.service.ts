import {Injectable} from '@angular/core';
import {supabaseAuthenticatedClient} from '../../../auth/supabase-authenticated-client';

@Injectable({
    providedIn: 'root'
})
export class GroupInvitationsOfUserActionService {
    private readonly supabase = supabaseAuthenticatedClient;

    constructor(
        // private readonly groupInvitationsOfUserStoreService: GroupInvitationsOfUserStoreService
    ) {
    }

    // public async readGroupInvitationsOfUser(): Promise<void> {
    //     const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_group_member_invitations_of_user'>[]> = await this.groupInvitationsOfUserStoreService.groupInvitationsOfUser.manageSelectApiCall(async () => {
    //         this.groupInvitationsOfUserStoreService.groupInvitationsOfUser.loading.startLoading();
    //         return this.supabase
    //         .rpc('read_group_member_invitations_of_user')
    //     })
    //     if (response.data) {
    //         // const imgPath = await this.supabase.storage.from('profile_images').createSignedUrl(response.data.profile_image, 3600 * 24 * 7);
    //         // response.data.profile_image = imgPath.data?.signedUrl as string;
    //         if (response.data) {
    //             // this.groupStoreService.group.setObject(response.data);
    //             console.log(response.data)
    //             this.groupInvitationsOfUserStoreService.groupInvitationsOfUser.setObjects(response.data);
    //             this.groupInvitationsOfUserStoreService.groupInvitationsOfUser.loading.stopLoading();
    //         }
    //     }
    // }
}
