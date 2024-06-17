import {effect, inject, Injectable} from '@angular/core';
import {BaseObjectStore} from '../../../store-signal-functions/object/base-object-store.service';
import {rpcObjectHandler} from '../../../store-signal-functions/object/rpcObjectHandlerFeature';
import {GroupStore} from '../../group/store/group.store.';

@Injectable({
                providedIn: 'any'
            })
export class GroupFollowStore extends BaseObjectStore<'check_if_user_follows_group'> {
    private groupStore: GroupStore = inject(GroupStore);

    constructor() {
        super(false);

        effect((): void => {
            console.log('loadingState changed: ', this.loadingState())});
    }

    public async checkIfFollowing(userId: string): Promise<void> {
        // this.loadingState().loading = true;
        console.log('loadingState: ', this.loadingState());
        console.log('checkIfFollowing before: ', this.data());
        const result = await rpcObjectHandler(
            {
                fn: 'check_if_user_follows_group',
                args: {
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
        console.log('checkIfFollowing after: ', this.data());
                this.loadingState().loading = false;
                console.log('loadingState after: ', this.loadingState());

    }

    public async follow(): Promise<void> {
        console.log('groupStore: ', this.groupStore.data());
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
    }

}
