import {inject, Injectable} from '@angular/core';
import {BaseArrayStore} from '../../../store-signal-functions/array/base-array-store.service';
import {rpcArrayHandler} from '../../../store-signal-functions/array/rpcArrayHandlerFeature';
import {ProfileCounterStore} from './profile-counter.store';
import {removeObjectByPropertyValue} from '../../../store-signal-functions/array/removeItemFeatue';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';

@Injectable({providedIn: 'root'})
export class FollowersOfUserStore extends BaseArrayStore<'read_followers_of_user'> {
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
                fn: 'read_followers_of_user'
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
        const result = await rpcArrayHandler(
            {
                fn: 'remove_follower_of_authenticated_user_transaction',
                args: {
                    _follower_id: userId
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
                successMessage: 'FollowersOfUser loaded!'
            }
        );
        if (!result().error) {
            removeObjectByPropertyValue<SupabaseObjectReturn<'read_followers_of_user'>>(
                'id_',
                userId,
                this.data_
            );
            this.profileCounterStore.decrement('follower_counter_');
        }
    }

}
