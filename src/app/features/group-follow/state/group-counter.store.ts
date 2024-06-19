import {Injectable} from '@angular/core';
import {BaseObjectStore} from '../../../store-signal-functions/object/base-object-store.service';
import {rpcObjectHandler} from '../../../store-signal-functions/object/rpcObjectHandlerFeature';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {decrement, increment} from '../../../store-signal-functions/object/counterFeature';

type Read_group_key = keyof SupabaseObjectReturn<'read_group_counters'>;
type KeysExceptGroupId = Exclude<Read_group_key, 'group_id_'>;


@Injectable({providedIn: 'root'})
export class GroupCounterStore extends BaseObjectStore<'read_group_counters'> {

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
                fn: 'read_group_counters',
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
        increment<SupabaseObjectReturn<'read_group_counters'>>(this.data_, key);
    }

    public decrement(key: KeysExceptGroupId): void {
        decrement<SupabaseObjectReturn<'read_group_counters'>>(this.data_, key);
    }
}
