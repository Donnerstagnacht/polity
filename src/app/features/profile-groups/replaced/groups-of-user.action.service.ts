import {Injectable} from '@angular/core';
import {supabaseAuthenticatedClient} from '../../../auth/supabase-authenticated-client';

@Injectable({
    providedIn: 'root'
})
export class GroupsOfUserActionService {
    private readonly supabase = supabaseAuthenticatedClient;

    constructor(
        // private readonly groupsOfUserStoreService: GroupsOfUserStoreService
    ) {
    }

    // public async readGroupsOfUser(): Promise<void> {
    //     // this.groupsOfUserStoreService.groupsOfUser.loading.startLoading();
    //     const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_groups_of_user'>[]> = await this.groupsOfUserStoreService.groupsOfUser.manageSelectApiCall(async () => {
    //         return this.supabase
    //                    .rpc('read_groups_of_user');
    //     });
    //     if (response.data) {
    //         // const imgPath = await this.supabase.storage.from('profile_images').createSignedUrl(response.data.profile_image, 3600 * 24 * 7);
    //         // response.data.profile_image = imgPath.data?.signedUrl as string;
    //         if (response.data) {
    //             // this.groupStoreService.group.setObject(response.data);
    //             // console.log(response.data)
    //             this.groupsOfUserStoreService.groupsOfUser.setObjects(response.data);
    //             // this.groupsOfUserStoreService.groupsOfUser.loading.stopLoading();
    //         }
    //     }
    // }

}