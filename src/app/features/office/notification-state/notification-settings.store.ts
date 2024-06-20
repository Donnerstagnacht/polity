import {Injectable} from '@angular/core';
import {rpcObjectHandler} from '@polity-signal-store/object/rpcObjectHandlerFeature';
import {BaseObjectStore} from '@polity-signal-store/object/base-object-store.service';

@Injectable({providedIn: 'root'})
export class NotificationSettingsStore extends BaseObjectStore<'read_profile_notification_settings'> {

    constructor() {
        super({
            receive_follow_notifications_: false
        });
    }

    public async read(): Promise<void> {
        const result = await rpcObjectHandler(
            {
                fn: 'read_profile_notification_settings'
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

    public async update(newStatus: boolean): Promise<void> {
        const result = await rpcObjectHandler(
            {
                fn: 'update_profile_receive_notifications_from_follow',
                args: {
                    _new_status: newStatus
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
                successMessage: 'Notification settings updated!'
            }
        );
    }

}
