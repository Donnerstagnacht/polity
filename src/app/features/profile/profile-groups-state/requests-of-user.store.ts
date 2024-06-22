import {Injectable} from '@angular/core';
import {BaseArrayStore} from '@polity-signal-store/array/base-array-store.service';
import {rpcArrayHandler} from '@polity-signal-store/array/rpcArrayHandlerFeature';
import {removeObjectByPropertyValue} from '@polity-signal-store/array/removeItemFeatue';

@Injectable()
export class RequestsOfUserStore extends BaseArrayStore<'group_member_requests_of_user_read'> {

    constructor() {
        super({
            loading: false,
            dataRequested: false
        });
    }

    public async read(): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'group_member_requests_of_user_read'
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
        if (!result().error) {
            removeObjectByPropertyValue(
                'id_',
                requestId,
                this.data_
            );
        }
    }

}
