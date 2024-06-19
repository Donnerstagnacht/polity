import {inject, Injectable} from '@angular/core';
import {BaseArrayStore} from '../../../store-signal-functions/array/base-array-store.service';
import {rpcArrayHandler} from '../../../store-signal-functions/array/rpcArrayHandlerFeature';
import {GroupStore} from '../../group/store/group.store.';
import {GroupMembershipStatusStore} from './group-membership-status.store';
import {GroupCounterStore} from '../../group-follow/store/group-counter.store';
import {removeObjectByPropertyValue} from '../../../store-signal-functions/array/removeItemFeatue';

@Injectable({
    providedIn: 'root'
})
export class GroupMembersStore extends BaseArrayStore<'read_group_members'> {
    private groupStore: GroupStore = inject(GroupStore);
    private groupMembershipStatusStore: GroupMembershipStatusStore = inject(GroupMembershipStatusStore);
    private groupCounterStore: GroupCounterStore = inject(GroupCounterStore);

    constructor() {
        super({
            loading: false,
            dataRequested: false
        });
    }

    public async read(): Promise<void> {
        const groupId: string = this.groupStore.data().id_;
        await rpcArrayHandler(
            {
                fn: 'read_group_members',
                args: {
                    _group_id: groupId
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
                useSuccess: true,
                alertService: this.tuiAlertService,
                successMessage: 'Group members loaded!'
            }
        );
    }

    public async leave(): Promise<void> {
        const groupId: string = this.groupStore.data().id_;
        await rpcArrayHandler(
            {
                fn: 'leave_group_member_transaction',
                args: {
                    _group_id: groupId
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
                successMessage: 'Group left!'
            }
        );
        this.groupMembershipStatusStore.updateGroupMembershipStatus('no_member');
        this.groupCounterStore.decrement('group_member_counter_');
    }

    public async remove(membershipId: string): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'leave_group_by_membership_id_transaction',
                args: {
                    _membership_id: membershipId
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
                successMessage: 'Member removed'
            }
        );
        this.groupCounterStore.decrement('group_member_counter_');
        removeObjectByPropertyValue(
            'id_',
            membershipId,
            this.data_
        );
    }


}
