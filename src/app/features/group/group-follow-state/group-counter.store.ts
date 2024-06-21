import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {BaseObjectStore} from '@polity-signal-store/object/base-object-store.service';
import {rpcObjectHandler} from '@polity-signal-store/object/rpcObjectHandlerFeature';
import {decrement, increment} from '@polity-signal-store/object/counterFeature';

type group_read_key = keyof SupabaseObjectReturn<'group_counters_read'>;
type KeysExceptGroupId = Exclude<group_read_key, 'group_id_'>;


@Injectable({providedIn: 'root'})
export class GroupCounterStore extends BaseObjectStore<'group_counters_read'> {

    constructor() {
        super({
            group_id_: '',
            follower_counter_: 0,
            following_counter_: 0,
            group_member_counter_: 0
        });
    }

    public async read(groupId: string): Promise<void> {
        const result = await rpcObjectHandler(
            {
                fn: 'group_counters_read',
                args: {
                    _group_id: groupId
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

    public increment(key: KeysExceptGroupId): void {
        increment<SupabaseObjectReturn<'group_counters_read'>>(this.data_, key);
    }

    public decrement(key: KeysExceptGroupId): void {
        decrement<SupabaseObjectReturn<'group_counters_read'>>(this.data_, key);
    }
}
