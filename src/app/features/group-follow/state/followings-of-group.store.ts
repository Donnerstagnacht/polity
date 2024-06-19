import {inject, Injectable} from '@angular/core';
import {BaseArrayStore} from '../../../store-signal-functions/array/base-array-store.service';
import {rpcArrayHandler} from '../../../store-signal-functions/array/rpcArrayHandlerFeature';
import {GroupStore} from '../../group/state/group.store.';
import {GroupCounterStore} from './group-counter.store';
import {removeObjectByPropertyValue} from '../../../store-signal-functions/array/removeItemFeatue';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';

@Injectable()
export class FollowingsOfGroupStore extends BaseArrayStore<'read_followings_of_group'> {
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
                fn: 'read_followings_of_group',
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
                useSuccess: true,
                alertService: this.tuiAlertService,
                successMessage: 'Followings of group loaded!'
            }
        );
    }

    public async remove(userId: string): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'unfollow_group_transaction',
                args: {_following_id: userId}
            },
            {
                useLoading: true,
                loadingState: this.loadingState_
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
        removeObjectByPropertyValue<SupabaseObjectReturn<'read_followings_of_group'>>(
            'id_',
            userId,
            this.data_
        );
        this.groupCounterStore.decrement('following_counter_');
    }

}
