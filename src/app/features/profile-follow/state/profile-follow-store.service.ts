import {inject, Injectable} from '@angular/core';
import {ProfileStore} from '../../profile/state/profile.store';
import {ProfileCounterStore} from './profile-counter.store';
import {rpcArrayHandler} from '../../../store-signal-functions/array/rpcArrayHandlerFeature';
import {BaseObjectStore} from '../../../store-signal-functions/object/base-object-store.service';

@Injectable({providedIn: 'root'})
export class ProfileFollowStore extends BaseObjectStore<'check_if_user_follows_profile'> {
    private profileStore: ProfileStore = inject(ProfileStore);
    private profileCouterStore: ProfileCounterStore = inject(ProfileCounterStore);

    constructor() {
        super(
            true
            ,
            {
                loading: false,
                dataRequested: false
            }
        );
    }

    public async checkIfFollowing(userId: string): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'check_if_user_follows_profile',
                args:
                    {
                        _following_id: userId
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

    public async follow(): Promise<void> {
        const followingId: string = this.profileStore.data().profile_id_;
        await rpcArrayHandler(
            {
                fn: 'follow_profile_transaction',
                args: {
                    _following_id: followingId
                }
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
                successMessage: 'Followed!'
            }
        );
        this.profileCouterStore.increment('follower_counter_');
        this.updateFollowStatus(true);
    }

    public async unfollow(): Promise<void> {
        const followingId: string = this.profileStore.data().profile_id_;
        await rpcArrayHandler(
            {
                fn: 'unfollow_profile_transaction',
                args: {
                    _following_id: followingId
                }
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
                successMessage: 'Followed!'
            }
        );
        this.profileCouterStore.decrement('follower_counter_');
        this.updateFollowStatus(false);
    }


    private updateFollowStatus(newStatus: boolean): void {
        this.data_.set(newStatus);
    }

}
