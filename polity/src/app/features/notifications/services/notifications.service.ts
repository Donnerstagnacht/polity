import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {DatabaseModified} from "../../../../../supabase/types/supabase.modified";
import {SessionStoreService} from "../../../core/services/session-store.service";
import {NotificationsStoreService} from "./notifications-store.service";
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";
import {ErrorStoreService} from "../../../shared/services/error-store.service";
import {supabaseClient} from "../../../shared/services/supabase-client";

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    private readonly supabaseClient: SupabaseClient<DatabaseModified> = supabaseClient;

    constructor(
        private readonly sessionStoreService: SessionStoreService,
        private readonly notificationStoreService: NotificationsStoreService,
        private readonly errorStoreService: ErrorStoreService
    ) {
    }

    public async selectNotifications(): Promise<void> {
        try {
            const sessionId: string = this.sessionStoreService.sessionId() as string;
            console.log(sessionId)
            const response: PostgrestSingleResponse<Tables<'notifications_by_user'>[]> = await this.supabaseClient
            .rpc('select_notifications_of_users', {user_id: sessionId})
            .throwOnError()

            console.log('data', Array.isArray(response.data), response.data)
            if (response.data) {
                // this.notificationStoreService.mutateNotifications(response.data);
                this.notificationStoreService.notifications.mutateEntities(response.data);
            }
        } catch (error: any) {
            this.errorStoreService.updateError(error.message, true);
        }
    }

    public async insertNotification(
        receiver: string,
        type_of_notification: DatabaseModified["public"]["Enums"]["notifications_enum"]
    ): Promise<void> {
        try {
            const sessionId: string = this.sessionStoreService.sessionId() as string;
            const response: PostgrestSingleResponse<undefined> = await this.supabaseClient
            .rpc('create_notification_from_user_transaction', {
                sender: sessionId,
                receiver: receiver,
                type_of_notification: type_of_notification,
                read_by_receiver: false
            })
            .throwOnError()
        } catch (error: any) {
            this.errorStoreService.updateError(error.message, true);
        }
    }

    public async resetNotificationCounter(): Promise<void> {
        try {
            const sessionId: string = this.sessionStoreService.sessionId() as string;
            const response: PostgrestSingleResponse<Tables<'notifications_by_user'>> = await this.supabaseClient
            .rpc('reset_notification_counter', {user_id: sessionId})
            .single()
            .throwOnError()
        } catch (error: any) {
            this.errorStoreService.updateError(error.message, true);
        }
    }

    public async updateReceiveFollowNotificationStatus(): Promise<void> {
        try {
            const sessionId: string = this.sessionStoreService.sessionId() as string;
            const response: PostgrestSingleResponse<Tables<'notifications_by_user'>> = await this.supabaseClient
            .rpc('update_receive_notifications_from_follow', {
                user_id: sessionId,
                new_status: true
            })
            .single()
            .throwOnError()
        } catch (error: any) {
            this.errorStoreService.updateError(error.message, true);
        }
    }
}
