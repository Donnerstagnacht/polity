import {inject, Injectable} from '@angular/core';

import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';

import {ProfileCounterStore} from './profile-counter.store';
import {BaseArrayStore} from '@polity-signal-store/array/base-array-store.service';
import {rpcArrayHandler} from '@polity-signal-store/array/rpcArrayHandlerFeature';
import {removeObjectByPropertyValue} from '@polity-signal-store/array/removeItemFeatue';


@Injectable({providedIn: 'root'})
export class FollowingsOfUserStore extends BaseArrayStore<'read_followings_of_user'> {
    private profileCounterStore: ProfileCounterStore = inject(ProfileCounterStore);

    constructor() {
        super({
            loading: false,
            dataRequested: false
        });
    }

    public async read(): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'read_followings_of_user'
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

    public async delete(userId: string): Promise<void> {
        console.log('data', this.data_());
        const result = await rpcArrayHandler(
            {
                fn: 'unfollow_profile_transaction',
                args: {_following_id: userId}

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
                successMessage: 'Following deleted!'
            }
        );
        if (!result().error) {
            removeObjectByPropertyValue<SupabaseObjectReturn<'read_followings_of_user'>>(
                'id_',
                userId,
                this.data_
            );
            this.profileCounterStore.decrement('following_counter_');
        }
    }

}
