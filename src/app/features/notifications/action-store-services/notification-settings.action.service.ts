import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {NotificationSettingsStoreService} from "./notification-settings.store.service";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {supabasePublicClient} from "../../../auth/supabase-public-client";

@Injectable({
    providedIn: 'root'
})
export class NotificationSettingsActionService {
    private supabaseClient: SupabaseClient<DatabaseOverwritten> = supabasePublicClient;

    constructor(private notificationSettingsStore: NotificationSettingsStoreService) {
    }

    public async selectNotificationSettings(): Promise<void> {
        await this.notificationSettingsStore.notificationSettings.wrapSelectFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_profile_notification_settings'>> = await this.supabaseClient
            .rpc('read_profile_notification_settings')
            .single()
            .throwOnError()
            console.log(response.data)
            if (response.data) {
                this.notificationSettingsStore.notificationSettings.setObject(response.data);
            }
        })
    }

    public async updateNotificationsFromFollow(newStatus: boolean): Promise<void> {
        let message: string = 'Du wirst keine Benachrichtigungen mehr bekommen, wenn dir jemand folgt.'
        if (newStatus) {
            message = 'Du bekommst wieder Nachrichten, wenn dir jemand folgt.'
        }
        await this.notificationSettingsStore.notificationSettings.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<undefined> = await this.supabaseClient
            .rpc(
                'update_profile_receive_notifications_from_follow',
                {_new_status: newStatus})
            .throwOnError()
            this.notificationSettingsStore.notificationSettings.setObject({receive_follow_notifications_: newStatus})

        }, true, message)
    }
}
