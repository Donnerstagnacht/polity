import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {ProfileCountersStoreService} from "./profile-counters.store.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {supabaseClient} from "../../../auth/supabase-client";

@Injectable({
    providedIn: 'root'
})
export class ProfileCountersActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private readonly profileCountersStoreService: ProfileCountersStoreService
    ) {
    }

    public async selectProfileCounter(userId: string): Promise<void> {
        await this.profileCountersStoreService.profileCounters.wrapSelectFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_profile_counters'>> = await this.supabaseClient.rpc(
                'read_profile_counters',
                {_user_id: userId}
            )
            .single()
            .throwOnError();
            if (response.data) {
                this.profileCountersStoreService.profileCounters.setObject(response.data);
            }
        })
    }

}
