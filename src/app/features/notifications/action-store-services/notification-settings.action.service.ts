import {Injectable} from '@angular/core';
import {PostgrestSingleResponse} from "@supabase/supabase-js";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {NotificationSettingsStoreService} from "./notification-settings.store.service";
import {supabaseAuthenticatedClient} from "../../../auth/supabase-authenticated-client";

@Injectable({
    providedIn: 'root'
})
export class NotificationSettingsActionService {
    private supabaseClient = supabaseAuthenticatedClient;

    constructor(private notificationSettingsStore: NotificationSettingsStoreService) {
    }

    public async selectNotificationSettings(): Promise<void> {
        const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_profile_notification_settings'>> = await this.notificationSettingsStore.notificationSettings.manageSelectApiCall(async () => {
            return this.supabaseClient
            .rpc('read_profile_notification_settings')
            .single()
        })
        if (response.data) {
            this.notificationSettingsStore.notificationSettings.setObject(response.data);
        }
    }

    public async updateNotificationsFromFollow(newStatus: boolean): Promise<void> {
        let message: string = 'Du wirst keine Benachrichtigungen mehr bekommen, wenn dir jemand folgt.'
        if (newStatus) {
            message = 'Du bekommst wieder Nachrichten, wenn dir jemand folgt.'
        }
        const response: PostgrestSingleResponse<undefined> = await this.notificationSettingsStore.notificationSettings.manageUpdateApiCall(async () => {
            return this.supabaseClient
            .rpc(
                'update_profile_receive_notifications_from_follow',
                {_new_status: newStatus})

        }, true, message)
        if (!response.error) {
            this.notificationSettingsStore.notificationSettings.setObject({receive_follow_notifications_: newStatus})
        }
    }
}
