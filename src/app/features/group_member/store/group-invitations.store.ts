import {inject, Injectable} from '@angular/core';
import {BaseArrayStore} from '../../../store-signal-functions/array/base-array-store.service';
import {rpcArrayHandler} from '../../../store-signal-functions/array/rpcArrayHandlerFeature';
import {GroupStore} from '../../group/store/group.store.';
import {GroupMembershipStatusStore} from './group-membership-status.store';
import {removeObjectByPropertyValue} from '../../../store-signal-functions/array/removeItemFeatue';
import {GroupCounterStore} from '../../group-follow/store/group-counter.store';

@Injectable({
    providedIn: 'root'
})
export class GroupInvitationsStore extends BaseArrayStore<'read_group_member_invitations'> {
    private groupStore: GroupStore = inject(GroupStore);
    private groupCountersStore: GroupCounterStore = inject(GroupCounterStore);
    private groupMembershipStatusStore: GroupMembershipStatusStore = inject(GroupMembershipStatusStore);

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
                fn: 'read_group_member_invitations',
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
                successMessage: 'GroupInvitations loaded!'
            }
        );
    }

    public async invite(user_id: string): Promise<void> {
        const groupId: string = this.groupStore.data().id_;
        await rpcArrayHandler(
            {
                fn: 'create_group_member_invitation',
                args: {
                    _group_id: groupId,
                    _member_id: user_id
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
                successMessage: 'Group invitation sent!'
            }
        );
    }

    public async accept(): Promise<void> {
        const groupId: string = this.groupStore.data().id_;
        await rpcArrayHandler(
            {
                fn: 'accept_group_invitation_transaction',
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
                successMessage: 'Group invitation sent!'
            }
        );
        this.groupCountersStore.increment('group_member_counter_');
        this.groupMembershipStatusStore.updateGroupMembershipStatus('member');
    }


    public async acceptById(invitation_id: string): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'accept_group_invitation_by_id_transaction',
                args: {
                    _invitation_id: invitation_id
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
                successMessage: 'Group invitation sent!'
            }
        );
        removeObjectByPropertyValue(
            'id_',
            invitation_id,
            this.data_
        );
        this.groupCountersStore.increment('group_member_counter_');
        this.groupMembershipStatusStore.updateGroupMembershipStatus('member');
    }

    public async remove(invitation_id: string): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'delete_group_member_invitation_by_id',
                args: {
                    _invitation_id: invitation_id
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
                successMessage: 'Group invitation sent!'
            }
        );
        removeObjectByPropertyValue(
            'id_',
            invitation_id,
            this.data_
        );
        this.groupCountersStore.increment('group_member_counter_');
    }

    public async decline(): Promise<void> {
        const groupId: string = this.groupStore.data().id_;
        await rpcArrayHandler(
            {
                fn: 'delete_group_member_invitation',
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
                successMessage: 'Group invitation sent!'
            }
        );
        this.groupMembershipStatusStore.updateGroupMembershipStatus('no_member');
    }

}
