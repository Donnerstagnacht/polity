import {inject, Injectable} from '@angular/core';
import {GroupStore} from '../../group/state/group.store.';
import {GroupCounterStore} from './group-counter.store';
import {rpcObjectHandler} from '@polity-signal-store/object/rpcObjectHandlerFeature';
import {BaseObjectStore} from '@polity-signal-store/object/base-object-store.service';

@Injectable({providedIn: 'root'})
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
        const groupId = this.groupStore.data().id_;
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
        if (!result().error) {
            this.groupCounterStore.increment('follower_counter_');
            this.updateFollowStatus(true);
        }
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
        if (!result().error) {
            this.groupCounterStore.decrement('follower_counter_');
            this.updateFollowStatus(false);
        }
    }

    private updateFollowStatus(newStatus: boolean): void {
        this.data_.set(newStatus);
    }

}
