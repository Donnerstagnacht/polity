import {inject, Injectable} from '@angular/core';
import {BaseArrayStore} from '../../../store-signal-functions/array/base-array-store.service';
import {rpcArrayHandler} from '../../../store-signal-functions/array/rpcArrayHandlerFeature';
import {GroupStore} from '../../group/state/group.store.';
import {GroupMembershipStatusStore} from './group-membership-status.store';
import {removeObjectByPropertyValue} from '../../../store-signal-functions/array/removeItemFeatue';
import {GroupCounterStore} from '../../group-follow/state/group-counter.store';

@Injectable({providedIn: 'root'})
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
                useSuccess: false
            }
        );
    }

    public async invite(user_id: string): Promise<void> {
        const groupId: string = this.groupStore.data().id_;
        const result = await rpcArrayHandler(
            {
                fn: 'create_group_member_invitation',
                args: {
                    _group_id: groupId,
                    _member_id: user_id
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
                successMessage: 'Group invitation sent!'
            }
        );
    }

    public async accept(): Promise<void> {
        const groupId: string = this.groupStore.data().id_;
        const result = await rpcArrayHandler(
            {
                fn: 'accept_group_invitation_transaction',
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
                successMessage: 'Group invitation sent!'
            }
        );
        if (!result().error) {
            this.groupCountersStore.increment('group_member_counter_');
            this.groupMembershipStatusStore.updateGroupMembershipStatus('member');
        }
    }


    public async acceptById(invitation_id: string): Promise<void> {
        const result = await rpcArrayHandler(
            {
                fn: 'accept_group_invitation_by_id_transaction',
                args: {
                    _invitation_id: invitation_id
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
                successMessage: 'Group invitation sent!'
            }
        );
        if (!result().error) {
            removeObjectByPropertyValue(
                'id_',
                invitation_id,
                this.data_
            );
            this.groupMembershipStatusStore.updateGroupMembershipStatus('member');
        }
    }

    public async remove(invitation_id: string): Promise<void> {
        const result = await rpcArrayHandler(
            {
                fn: 'delete_group_member_invitation_by_id',
                args: {
                    _invitation_id: invitation_id
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
                successMessage: 'Group invitation sent!'
            }
        );
        if (!result().error) {
            removeObjectByPropertyValue(
                'id_',
                invitation_id,
                this.data_
            );
        }
    }

    public async decline(): Promise<void> {
        const groupId: string = this.groupStore.data().id_;
        const result = await rpcArrayHandler(
            {
                fn: 'delete_group_member_invitation',
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
                successMessage: 'Group invitation sent!'
            }
        );
        if (!result().error) {
            this.groupMembershipStatusStore.updateGroupMembershipStatus('no_member');
        }
    }

}
