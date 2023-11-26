import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {SessionStoreService} from "../../../auth/services/session.store.service";
import {NotificationsStoreService} from "./notifications-store.service";
import {Functions, Tables} from "../../../../../supabase/types/supabase.shorthand-types";
import {supabaseClient} from "../../../auth/supabase-client";

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private readonly sessionStoreService: SessionStoreService,
        private readonly notificationStoreService: NotificationsStoreService
    ) {
    }

    public async selectNotifications(): Promise<void> {
        await this.notificationStoreService.notifications.wrapSelectFunction(async (): Promise<void> => {
            const sessionId: string = this.sessionStoreService.getSessionId() as string;
            const response: PostgrestSingleResponse<Functions<'select_notifications_of_users'>> = await this.supabaseClient
            .rpc('select_notifications_of_users', {user_id: sessionId})
            .throwOnError()
            if (response.data) {
                this.notificationStoreService.notifications.setObjects(response.data);
            }
        })
    }

    public async insertNotification(
        receiver: string,
        type_of_notification: DatabaseOverwritten["public"]["Enums"]["notifications_enum"]
    ): Promise<void> {
        await this.notificationStoreService.notifications.wrapUpdateFunction(async (): Promise<void> => {
            const sessionId: string = this.sessionStoreService.getSessionId() as string;
            const response: PostgrestSingleResponse<undefined> = await this.supabaseClient
            .rpc('create_notification_from_user_transaction', {
                sender: sessionId,
                receiver: receiver,
                type_of_notification: type_of_notification,
                read_by_receiver: false
            })
            .throwOnError()
        })
    }

    public async resetNotificationCounter(): Promise<void> {
        await this.notificationStoreService.notifications.wrapUpdateFunction(async (): Promise<void> => {
            const sessionId: string = this.sessionStoreService.getSessionId() as string;
            const response: PostgrestSingleResponse<Tables<'notifications_by_user'>> = await this.supabaseClient
            .rpc('reset_notification_counter', {user_id: sessionId})
            .single()
            .throwOnError()
        })
    }

    public async updateReceiveFollowNotificationStatus(): Promise<void> {
        await this.notificationStoreService.notifications.wrapUpdateFunction(async (): Promise<void> => {
            const sessionId: string = this.sessionStoreService.getSessionId() as string;
            const response: PostgrestSingleResponse<Tables<'notifications_by_user'>> = await this.supabaseClient
            .rpc('update_receive_notifications_from_follow', {
                user_id: sessionId,
                new_status: true
            })
            .single()
            .throwOnError()
        })
    }
}
