import {inject, Injectable} from '@angular/core';
import {GroupStore} from '../../group/state/group.store.';
import {GroupCounterStore} from './group-counter.store';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {BaseArrayStore} from '@polity-signal-store/array/base-array-store.service';
import {rpcArrayHandler} from '@polity-signal-store/array/rpcArrayHandlerFeature';
import {removeObjectByPropertyValue} from '@polity-signal-store/array/removeItemFeatue';

@Injectable({providedIn: 'root'})
export class FollowersOfGroupStore extends BaseArrayStore<'read_followers_of_group'> {
    private groupStore: GroupStore = inject(GroupStore);
    private groupCounterStore: GroupCounterStore = inject(GroupCounterStore);

    constructor() {
        super({
            loading: true,
            dataRequested: false
        });
    }

    public async read(): Promise<void> {
        const groupId: string = this.groupStore.data().id_;
        await rpcArrayHandler(
            {
                fn: 'read_followers_of_group',
                args: {_group_id: groupId}
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

    public async remove(userId: string): Promise<void> {
        const groupId: string = this.groupStore.data().id_;
        const result = await rpcArrayHandler(
            {
                fn: 'remove_group_follower_transaction',
                args: {
                    _follower_id: userId,
                    _group_id_in: groupId
                }
            },
            {
                useLoading: false
            },
            {
                useStore: false
            },
            {
                useError: true,
                errorStoreService: this.errorStoreService
            },
            {
                useSuccess: true,
                alertService: this.tuiAlertService,
                successMessage: 'Followings of group loaded!'
            }
        );
        if (!result().error) {
            removeObjectByPropertyValue<SupabaseObjectReturn<'read_followings_of_group'>>(
                'id_',
                userId,
                this.data_
            );
            this.groupCounterStore.decrement('follower_counter_');
        }
    }

}
