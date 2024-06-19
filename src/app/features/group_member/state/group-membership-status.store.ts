import {computed, Injectable} from '@angular/core';
import {BaseObjectStore} from '../../../store-signal-functions/object/base-object-store.service';
import {rpcObjectHandler} from '../../../store-signal-functions/object/rpcObjectHandlerFeature';


@Injectable({providedIn: 'root'})
export class GroupMembershipStatusStore extends BaseObjectStore<'check_group_membership_status'> {

    public isNoMember = computed(() => {
        if (this.data_() === 'no_member') {
            return true;
        } else {
            return false;
        }
    });

    public isMember = computed(() => {
        if (this.data_() === 'member') {
            return true;
        } else {
            return false;
        }
    });

    public isBoardMember = computed(() => {
        if (this.data_() === 'board_member') {
            return true;
        } else {
            return false;
        }
    });

    public isRequested = computed(() => {
        if (this.data_() === 'requested') {
            return true;
        } else {
            return false;
        }
    });

    public isInvited = computed(() => {
        if (this.data_() === 'invited') {
            return true;
        } else {
            return false;
        }
    });

    constructor() {
        super('test');
    }

    public async read(groupId: string): Promise<void> {
        await rpcObjectHandler(
            {
                fn: 'check_group_membership_status',
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

    public updateGroupMembershipStatus(status: 'no_member' | 'member' | 'board_member' | 'requested' | 'invited'): void {
        this.data_.set(status);
    }

}
