import {Injectable} from '@angular/core';
import {BaseArrayStore} from "../../../store-signal-functions/array/base-array-store.service";
import {rpcArrayHandler} from "../../../store-signal-functions/array/rpcArrayHandlerFeature";


@Injectable({
    providedIn: 'root'
})
export class NotificationStore extends BaseArrayStore<'read_notifications_of_user'> {


    public async read(): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'read_notifications_of_user',
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
                successMessage: 'Notifications geladen!'
            }
        )
    }

    public async resetNotificationCounter(): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'reset_profile_notification_counter',
            })
    }

}
