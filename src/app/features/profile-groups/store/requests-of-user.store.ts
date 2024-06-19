import {Injectable} from '@angular/core';
import {BaseArrayStore} from '../../../store-signal-functions/array/base-array-store.service';
import {rpcArrayHandler} from '../../../store-signal-functions/array/rpcArrayHandlerFeature';
import {removeObjectByPropertyValue} from '../../../store-signal-functions/array/removeItemFeatue';

@Injectable({
    providedIn: 'root'
})
export class RequestsOfUserStore extends BaseArrayStore<'read_group_requests_of_user'> {

    constructor() {
        super({
            loading: false,
            dataRequested: false
        });
    }

    public async read(): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'read_group_requests_of_user'
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
                successMessage: 'RequestsOfUser loaded!'
            }
        );
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