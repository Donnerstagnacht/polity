import {inject, Injectable} from '@angular/core';
import {BaseObjectStore} from '../../../store-signal-functions/object/base-object-store.service';
import {rpcObjectHandler} from '../../../store-signal-functions/object/rpcObjectHandlerFeature';
import {GroupStore} from '../../group/store/group.store.';
import {GroupCounterStore} from './group-counter.store';

@Injectable()
export class GroupFollowStore extends BaseObjectStore<'check_if_user_follows_group'> {
    private groupCounterStore: GroupCounterStore = inject(GroupCounterStore);
    private groupStore: GroupStore = inject(GroupStore);

    constructor() {
        super(false);
    }

    public async checkIfFollowing(groupId: string): Promise<void> {
        const result = await rpcObjectHandler(
            {
                fn: 'check_if_user_follows_group',
                args: {
                    _following_id: groupId
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
        // console.log('groupStore: ', this.groupStore.data());
        const groupId = this.groupStore.data().id_;
        console.log('groupId: ', groupId);
        const result = await rpcObjectHandler(
            {
                fn: 'follow_group_transaction',
                args: {
                    _following_id: groupId
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
                successMessage: 'Followed successful!'
            }
        );
        this.groupCounterStore.increment('follower_counter_');
        this.updateFollowStatus(true);
    }

    public async unFollow(): Promise<void> {
        const groupId = this.groupStore.data().id_;
        const result = await rpcObjectHandler(
            {
                fn: 'unfollow_group_transaction',
                args: {
                    _following_id: groupId
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
                successMessage: 'Unfollowed successful!'
            }
        );
        this.groupCounterStore.decrement('follower_counter_');
        this.updateFollowStatus(false);
    }

    private updateFollowStatus(newStatus: boolean): void {
        this.data_.set(newStatus);
    }

}
