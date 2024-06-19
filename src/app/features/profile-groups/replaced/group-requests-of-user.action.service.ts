import {Injectable} from '@angular/core';
import {supabaseAuthenticatedClient} from '../../../auth/supabase-authenticated-client';

@Injectable({
    providedIn: 'root'
})
export class GroupRequestsOfUserActionService {
    private readonly supabase = supabaseAuthenticatedClient;

    constructor(
        // private readonly groupRequestsOfUserStoreService: GroupRequestsOfUserStoreService
    ) {
    }

    // public async readGroupRequestsOfUser(): Promise<void> {
    //     const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_group_requests_of_user'>[]> = await this.groupRequestsOfUserStoreService.groupRequestsOfUser.manageSelectApiCall(async () => {
    //         this.groupRequestsOfUserStoreService.groupRequestsOfUser.loading.startLoading();
    //         return this.supabase
    //         .rpc('read_group_requests_of_user')
    //     })
    //     if (response.data) {
    //         // const imgPath = await this.supabase.storage.from('profile_images').createSignedUrl(response.data.profile_image, 3600 * 24 * 7);
    //         // response.data.profile_image = imgPath.data?.signedUrl as string;
    //         if (response.data) {
    //             // this.groupStoreService.group.setObject(response.data);
    //             console.log(response.data)
    //             this.groupRequestsOfUserStoreService.groupRequestsOfUser.setObjects(response.data);
    //             this.groupRequestsOfUserStoreService.groupRequestsOfUser.loading.stopLoading();
    //         }
    //     }
    // }
}
