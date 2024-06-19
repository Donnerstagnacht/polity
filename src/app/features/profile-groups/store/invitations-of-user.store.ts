import {Injectable} from '@angular/core';
import {BaseArrayStore} from '../../../store-signal-functions/array/base-array-store.service';
import {rpcArrayHandler} from '../../../store-signal-functions/array/rpcArrayHandlerFeature';
import {removeObjectByPropertyValue} from '../../../store-signal-functions/array/removeItemFeatue';

@Injectable({
    providedIn: 'root'
})
export class InvitationsOfUserStore extends BaseArrayStore<'read_group_member_invitations_of_user'> {

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
                useSuccess: true,
                alertService: this.tuiAlertService,
                successMessage: 'InvitationsOfUser loaded!'
            }
        );
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
        //TODO increment user membership counter
        // this.groupCountersStore.increment('group_member_counter_');
        removeObjectByPropertyValue(
            'id_',
            invitation_id,
            this.data_
        );
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
        //TODO increment user member store
        // this.groupCountersStore.increment('group_member_counter_');
        removeObjectByPropertyValue(
            'id_',
            invitation_id,
            this.data_
        );
    }

}
