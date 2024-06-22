import {inject, Injectable} from '@angular/core';
import {GroupStore} from '../state/group.store.';
import {GroupMembershipStatusStore} from './group-membership-status.store';
import {BaseArrayStore} from '@polity-signal-store/array/base-array-store.service';
import {rpcArrayHandler} from '@polity-signal-store/array/rpcArrayHandlerFeature';
import {removeObjectByPropertyValue} from '@polity-signal-store/array/removeItemFeatue';
import {GroupCounterStore} from '@polity-group/group-follow-state/group-counter.store';

@Injectable({providedIn: 'root'})
export class GroupRequestsStore extends BaseArrayStore<'group_member_requests_of_group_read'> {
    private groupStore: GroupStore = inject(GroupStore);
    private groupCounterStore: GroupCounterStore = inject(GroupCounterStore);
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
                fn: 'group_member_requests_of_group_read',
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
            },
            {
                useExtractImgUrl: true,
                key: 'profile_image_',
                bucket: 'profile_images'
            }
        );
    }

    public async request(): Promise<void> {
        const groupId: string = this.groupStore.data().id_;
        await rpcArrayHandler(
            {
                fn: 'group_member_requests_create',
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
        const result = await rpcArrayHandler(
            {
                fn: 'accept_group_membership_request_transaction',
                args: {
                    _request_id: membershipRequestId
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
                successMessage: 'Group membership accepted!'
            }
        );
        if (!result().error) {
            removeObjectByPropertyValue(
                'id_',
                membershipRequestId,
                this.data_
            );
            this.groupCounterStore.increment('group_member_counter_');
        }
    }

    public async decline(membershipRequestId: string): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'group_member_requests_delete',
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
                fn: 'group_member_requests_delete',
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
                fn: 'group_member_requests_delete_by_id',
                args: {
                    _request_id: requestId
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
