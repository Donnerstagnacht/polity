import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GroupCountersActionService {
    // private readonly supabaseClient = supabaseAuthenticatedClient;
    //
    // constructor(
    //     private readonly groupCountersStoreService: GroupCountersStoreService,
    //     private readonly groupStoreService: GroupStoreService
    // ) {
    // }

    // public async selectGroupCounter(groupId: string): Promise<void> {
    //     const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_group_counters'>> = await this.groupCountersStoreService.groupCounters.manageSelectApiCall(async () => {
    //         return this.supabaseClient.rpc(
    //             'read_group_counters',
    //             {_group_id: groupId}
    //         )
    //         .single()
    //     })
    //     if (response.data) {
    //         this.groupCountersStoreService.groupCounters.setObject(response.data);
    //     }
    // }

    // public async checkIfFollowing(): Promise<void> {
    //     const followingId: string = this.groupStoreService.group.getValueByKey('id_');
    //     this.groupStoreService.group.uiFlagStore.setFlagTrue('isFollowingCheckLoading');
    //
    //     const response: PostgrestSingleResponse<SupabaseObjectReturn<'check_if_user_follows_group'>> = await this.groupCountersStoreService.groupCounters.manageSelectApiCall(async () => {
    //         return this.supabaseClient.rpc(
    //             'check_if_user_follows_group',
    //             {
    //                 _following_id: followingId as string
    //             }
    //         )
    //                    .single();
    //     });
    //     if (response.data) {
    //         this.groupStoreService.group.uiFlagStore.setFlagTrue('isFollowing');
    //     } else {
    //         console.log(response.error);
    //         this.groupStoreService.group.uiFlagStore.setFlagFalse('isFollowing');
    //     }
    //     this.groupStoreService.group.uiFlagStore.setFlagFalse('isFollowingCheckLoading');
    // }

    // public async followGroup(): Promise<void> {
    //     const followingId: string = this.groupStoreService.group.getValueByKey('id_');
    //     const response: PostgrestSingleResponse<SupabaseObjectReturn<'follow_group_transaction'>> = await this.groupCountersStoreService.groupCounters.manageUpdateApiCall(async () => {
    //         return this.supabaseClient.rpc(
    //             'follow_group_transaction',
    //             {
    //                 _following_id: followingId
    //             }
    //         );
    //     }, true, 'Successful followed!');
    //     if (!response.error) {
    //         this.groupStoreService.group.uiFlagStore.setFlagTrue('isFollowing');
    //         this.groupCountersStoreService.groupCounters.incrementKey('follower_counter');
    //     }
    // }

    // public async unFollowGroup(): Promise<void> {
    //     const followingId = this.groupStoreService.group.getValueByKey('id_');
    //     const response: PostgrestSingleResponse<SupabaseObjectReturn<'unfollow_group_transaction'>> = await this.groupCountersStoreService.groupCounters.manageUpdateApiCall(async () => {
    //         return this.supabaseClient.rpc(
    //             'unfollow_group_transaction',
    //             {
    //                 _following_id: followingId
    //             }
    //         );
    //     }, true, 'Successful unfollowed!');
    //     if (!response.error) {
    //         this.groupStoreService.group.uiFlagStore.setFlagFalse('isFollowing');
    //         this.groupCountersStoreService.groupCounters.decrementKey('follower_counter');
    //     }
    //
    // }
}
