import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {DatabaseModified} from "../../../../../supabase/types/supabase.modified";
import {supabaseClient} from "../../../core/services/supabase-client";
import {SessionStoreService} from "../../../core/services/session-store.service";
import {NotificationsStoreService} from "./notifications-store.service";
import {ErrorStoreService} from "../../../core/services/error-store.service";
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";

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
            const response: PostgrestSingleResponse<Tables<'notifications_by_user'>[]> = await this.supabaseClient
            .rpc('select_notifications_of_users', {user_id: sessionId})
            .throwOnError()

            console.log('data', response.data)

            this.notificationStoreService.mutateNotifications(response.data);
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
