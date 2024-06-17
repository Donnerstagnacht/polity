import {Injectable} from '@angular/core';
import {ProfileCountersStoreService} from "./profile-counters.store.service";
import {supabaseAuthenticatedClient} from "../../../auth/supabase-authenticated-client";

@Injectable({
    providedIn: 'root'
})
export class ProfileCountersActionService {
    private readonly supabaseClient = supabaseAuthenticatedClient;

    constructor(
        private readonly profileCountersStoreService: ProfileCountersStoreService
    ) {
    }

    // public async selectProfileCounter(userId: string): Promise<void> {
    //     const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_profile_counters'>> = await this.profileCountersStoreService.profileCounters.manageSelectApiCall(async () => {
    //         return this.supabaseClient.rpc(
    //             'read_profile_counters',
    //             {_user_id: userId}
    //         )
    //         .single()
    //     })
    //     console.log(response);
    //     if (response.data) {
    //         this.profileCountersStoreService.profileCounters.setObject(response.data);
    //     }
    // }

}
