import {inject, Injectable} from '@angular/core';
import {BaseArrayStore} from '../../../store-signal-functions/array/base-array-store.service';
import {rpcArrayHandler} from '../../../store-signal-functions/array/rpcArrayHandlerFeature';
import {GroupStore} from '../../group/state/group.store.';
import {GroupMembershipStatusStore} from './group-membership-status.store';
import {removeObjectByPropertyValue} from '../../../store-signal-functions/array/removeItemFeatue';

@Injectable({
    providedIn: 'root'
})
export class GroupRequestsStore extends BaseArrayStore<'read_group_member_requests'> {
    private groupStore: GroupStore = inject(GroupStore);
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
                fn: 'read_group_member_requests',
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
                successMessage: 'GroupRequests loaded!'
            }
        );
    }

    public async request(): Promise<void> {
        const groupId: string = this.groupStore.data().id_;
        await rpcArrayHandler(
            {
                fn: 'create_group_member_request',
                args: {
                    _group_id: groupId
                }
            },
            {
                useLoading: true
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
                successMessage: 'Request send!'
            }
        );
        this.groupMembershipStatusStore.updateGroupMembershipStatus('requested');
    }

    public async accept(membershipRequestId: string): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'accept_group_membership_request_transaction',
                args: {
                    _request_id: membershipRequestId
                }
            },
            {
                useLoading: true
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
                successMessage: 'Group membership accepted!'
            }
        );
        // this.groupMembershipStatusStore.updateGroupMembershipStatus('requested');
    }

    public async decline(membershipRequestId: string): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'delete_group_member_request',
                args: {
                    _group_id: membershipRequestId
                }
            },
            {
                useLoading: true
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
                successMessage: 'Group membership accepted!'
            }
        );
        // this.groupMembershipStatusStore.updateGroupMembershipStatus('requested');
    }

    public async withdraw(): Promise<void> {
        const groupId: string = this.groupStore.data().id_;
        await rpcArrayHandler(
            {
                fn: 'delete_group_member_request',
                args: {
                    _group_id: groupId
                }
            },
            {
                useLoading: true
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
                successMessage: 'Group membership accepted!'
            }
        );
        this.groupMembershipStatusStore.updateGroupMembershipStatus('no_member');
    }

    public async deleteById(requestId: string): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'delete_group_member_request_by_id',
                args: {
                    _request_id: requestId
                }
            },
            {
                useLoading: true
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
                successMessage: 'Group membership accepted!'
            }
        );
        removeObjectByPropertyValue(
            'id_',
            requestId,
            this.data_
        );
    }


}
