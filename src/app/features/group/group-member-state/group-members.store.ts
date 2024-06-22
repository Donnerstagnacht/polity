import {inject, Injectable} from '@angular/core';
import {GroupStore} from '../state/group.store.';
import {GroupMembershipStatusStore} from './group-membership-status.store';
import {rpcArrayHandler} from '@polity-signal-store/array/rpcArrayHandlerFeature';
import {BaseArrayStore} from '@polity-signal-store/array/base-array-store.service';
import {removeObjectByPropertyValue} from '@polity-signal-store/array/removeItemFeatue';
import {GroupCounterStore} from '@polity-group/group-follow-state/group-counter.store';

@Injectable({providedIn: 'root'})
export class GroupMembersStore extends BaseArrayStore<'group_members_of_group_read'> {
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
                fn: 'group_members_of_group_read',
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
                useSuccess: false
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
