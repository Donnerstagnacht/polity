import {inject, Injectable} from '@angular/core';
import {supabaseAuthenticatedClient} from '../../../auth/supabase-authenticated-client';
import {ProfileCounterStore} from '../store/profile-counter.store';

@Injectable({
    providedIn: 'root'
})
export class FollowingGroupsOfUserActionService {
    private readonly supabaseClient = supabaseAuthenticatedClient;
    private profileCountersStore: ProfileCounterStore = inject(ProfileCounterStore);

    // constructor(
    //     // // private readonly profileCountersStoreService: ProfileCountersStoreService,
    //     //
    //     // private readonly followingGroupsOfUserStoreService: FollowingGroupsOfUserStoreService) {
    // }

    // public async readFollowingGroupsOfUser(): Promise<any> {
    //     const followingResponse: PostgrestSingleResponse<SupabaseObjectReturn<'read_group_followings_of_user'>[]> =
    //         await this.followingGroupsOfUserStoreService.followingGroupsOfUser.manageSelectApiCall(async () => {
    //             return this.supabaseClient.rpc(
    //                 'read_group_followings_of_user'
    //             )
    //                        .throwOnError();
    //         });
    //     if (followingResponse.data) {
    //         // const finalArray: SupabaseObjectReturn<'read_following_of_user'>[] = await this.profileActionService.transformImageNamesToUrls(followingResponse.data, 'img_url')
    //         this.followingGroupsOfUserStoreService.followingGroupsOfUser.setObjects(followingResponse.data);
    //     }
    // }


    // public async removeFollowingGroupOfUser(groupId: string): Promise<any> {
    //     const response: PostgrestSingleResponse<SupabaseObjectReturn<'unfollow_group_transaction'>> = await this.followingGroupsOfUserStoreService.followingGroupsOfUser.manageUpdateApiCall(async () => {
    //         return this.supabaseClient.rpc(
    //             'unfollow_group_transaction',
    //             {
    //                 _following_id: groupId
    //             }
    //         )
    //                    .single();
    //     }, true, 'Following group removed!');
    //
    //     if (!response.error) {
    //         this.followingGroupsOfUserStoreService.followingGroupsOfUser.removeObjectByPropertyValue(
    //             'id_',
    //             groupId
    //         );
    //         this.profileCountersStore.decrement('following_counter_');
    //         // this.profileCountersStoreService.profileCounters.decrementKey('following_counter')
    //     }
    // }
}
