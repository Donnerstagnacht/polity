import {inject, Injectable} from '@angular/core';
import {rpcArrayHandler} from '../../../store-signal-functions/array/rpcArrayHandlerFeature';
import {BaseArrayStore} from '../../../store-signal-functions/array/base-array-store.service';
import {ProfileCounterStore} from './profile-counter.store';
import {removeObjectByPropertyValue} from '../../../store-signal-functions/array/removeItemFeatue';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';

@Injectable({providedIn: 'root'})
export class FollowingsOfUserGroupStore extends BaseArrayStore<'read_group_followings_of_user'> {
    protected profileCounterStore: ProfileCounterStore = inject(ProfileCounterStore);

    constructor() {
        super({
            loading: false,
            dataRequested: false
        });
    }

    public async read(): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'read_group_followings_of_user'
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

    public async remove(groupId: string): Promise<void> {
        const result = await rpcArrayHandler(
            {
                fn: 'unfollow_group_transaction',
                args: {
                    _following_id: groupId
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
                successMessage: 'FollowingsOfUserGroup loaded!'
            }
        );
        if (!result().error) {
            removeObjectByPropertyValue<SupabaseObjectReturn<'read_group_followings_of_user'>>(
                'id_',
                groupId,
                this.data_
            );
            this.profileCounterStore.decrement('group_membership_counter_');
        }
    }

}
