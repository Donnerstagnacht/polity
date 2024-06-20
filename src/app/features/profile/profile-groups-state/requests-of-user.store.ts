import {Injectable} from '@angular/core';
import {BaseArrayStore} from '@polity-signal-store/array/base-array-store.service';
import {rpcArrayHandler} from '@polity-signal-store/array/rpcArrayHandlerFeature';
import {removeObjectByPropertyValue} from '@polity-signal-store/array/removeItemFeatue';

@Injectable()
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
                useSuccess: false
            }
        );
    }

    public async deleteById(requestId: string): Promise<void> {
        const result = await rpcArrayHandler(
            {
                fn: 'delete_group_member_request_by_id',
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
        if (!result().error) {
            removeObjectByPropertyValue(
                'id_',
                requestId,
                this.data_
            );
        }
    }

}
