import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {BaseObjectStore} from '@polity-signal-store/object/base-object-store.service';
import {rpcObjectHandler} from '@polity-signal-store/object/rpcObjectHandlerFeature';
import {decrement, increment} from '@polity-signal-store/object/counterFeature';

type profiles_read_key = keyof SupabaseObjectReturn<'profile_counters_read'>;
type KeysExceptProfileId = Exclude<profiles_read_key, 'profile_id_'>;

@Injectable({providedIn: 'root'})
export class ProfileCounterStore extends BaseObjectStore<'profile_counters_read'> {

    constructor() {
        super({
            profile_id_: '',
            follower_counter_: 0,
            following_counter_: 0,
            group_membership_counter_: 0
        });
    }

    public async read(userId: string): Promise<void> {
        const result = await rpcObjectHandler(
            {
                fn: 'profile_counters_read',
                args: {
                    _user_id: userId
                }
            },
            {
                useLoading: true,
                loadingState: this.loadingState_
            },
            {
                useStore: true,
                dataState: this.data_
            },

            {
                useError: true,
                errorStoreService: this.errorStoreService
            },
            {
                useSuccess: false
            }
        );
    }

    public increment(key: KeysExceptProfileId): void {
        increment<SupabaseObjectReturn<'profile_counters_read'>>(this.data_, key);
    }

    public decrement(key: KeysExceptProfileId): void {
        decrement<SupabaseObjectReturn<'profile_counters_read'>>(this.data_, key);
    }
}


