import {inject, Injectable} from '@angular/core';
import {BaseArrayStore} from '@polity-signal-store/array/base-array-store.service';
import {rpcArrayHandler} from '@polity-signal-store/array/rpcArrayHandlerFeature';
import {removeObjectByPropertyValue} from '@polity-signal-store/array/removeItemFeatue';
import {GroupCounterStore} from '@polity-group/group-follow-state/group-counter.store';

@Injectable({providedIn: 'root'})
export class InvitationsOfUserStore extends BaseArrayStore<'read_group_member_invitations_of_user'> {
    private groupCounterStore: GroupCounterStore = inject(GroupCounterStore);

    constructor() {
        super({
            loading: false,
            dataRequested: false
        });
    }

    public async read(): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'read_group_member_invitations_of_user'
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
            this.groupCounterStore.increment('group_member_counter_');
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

}
