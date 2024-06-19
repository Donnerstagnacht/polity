import {Injectable} from '@angular/core';
import {BaseArrayStore} from '../../../store-signal-functions/array/base-array-store.service';
import {rpcArrayHandler} from '../../../store-signal-functions/array/rpcArrayHandlerFeature';
import {removeObjectByPropertyValue} from '../../../store-signal-functions/array/removeItemFeatue';

@Injectable({
    providedIn: 'root'
})
export class MembershipsOfUserStore extends BaseArrayStore<'read_groups_of_user'> {

    constructor() {
        super({
            loading: false,
            dataRequested: false
        });
    }

    public async read(): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'read_groups_of_user'
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
                successMessage: 'MembershipsOfUser loaded!'
            }
        );
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
        //TODO decrement profile membership store
        // this.groupCounterStore.decrement('group_member_counter_');
        removeObjectByPropertyValue(
            'id_',
            membershipId,
            this.data_
        );
    }

}
