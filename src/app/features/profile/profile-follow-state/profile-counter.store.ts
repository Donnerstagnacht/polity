import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {BaseObjectStore} from '@polity-signal-store/object/base-object-store.service';
import {rpcObjectHandler} from '@polity-signal-store/object/rpcObjectHandlerFeature';
import {decrement, increment} from '@polity-signal-store/object/counterFeature';

type Read_profile_key = keyof SupabaseObjectReturn<'read_profile_counters'>;
type KeysExceptProfileId = Exclude<Read_profile_key, 'profile_id_'>;

@Injectable()
export class ProfileCounterStore extends BaseObjectStore<'read_profile_counters'> {

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
                fn: 'read_profile_counters',
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
        increment<SupabaseObjectReturn<'read_profile_counters'>>(this.data_, key);
    }

    public decrement(key: KeysExceptProfileId): void {
        decrement<SupabaseObjectReturn<'read_profile_counters'>>(this.data_, key);
    }
}


