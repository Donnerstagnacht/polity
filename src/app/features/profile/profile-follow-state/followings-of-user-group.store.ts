import {inject, Injectable} from '@angular/core';
import {ProfileCounterStore} from './profile-counter.store';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {BaseArrayStore} from '@polity-signal-store/array/base-array-store.service';
import {rpcArrayHandler} from '@polity-signal-store/array/rpcArrayHandlerFeature';
import {removeObjectByPropertyValue} from '@polity-signal-store/array/removeItemFeatue';

@Injectable({providedIn: 'root'})
export class FollowingsOfUserGroupStore extends BaseArrayStore<'group_followings_of_user_read'> {
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
                fn: 'group_followings_of_user_read'
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
            },
            {
                useExtractImgUrl: true,
                key: 'img_url_',
                bucket: 'group_images'
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
            removeObjectByPropertyValue<SupabaseObjectReturn<'group_followings_of_user_read'>>(
                'id_',
                groupId,
                this.data_
            );
            this.profileCounterStore.decrement('group_membership_counter_');
        }
    }

}
