import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {NotificationsStoreService} from "./notifications.store.service";
import {FunctionSingleReturn, FunctionTableReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {supabaseClient} from "../../../auth/supabase-client";

@Injectable({
    providedIn: 'root'
})
export class NotificationsActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private readonly notificationStoreService: NotificationsStoreService
    ) {
    }

    public async selectNotifications(): Promise<void> {
        await this.notificationStoreService.notifications.wrapSelectFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<FunctionTableReturn<'select_notifications_of_users'>> = await this.supabaseClient
            .rpc('select_notifications_of_users')
            .throwOnError()
            if (response.data) {
                this.notificationStoreService.notifications.setObjects(response.data);
            }
        })
    }

    // public async insertNotification(
    //     receiver: string,
    //     type_of_notification: DatabaseOverwritten["public"]["Enums"]["notifications_enum"]
    // ): Promise<void> {
    //     await this.notificationStoreService.notifications.wrapUpdateFunction(async (): Promise<void> => {
    //         const sessionId: string = this.sessionStoreService.getSessionId() as string;
    //         const response: PostgrestSingleResponse<undefined> = await this.supabaseClient
    //         .rpc('cre', {
    //             sender: sessionId,
    //             receiver: receiver,
    //             type_of_notification: type_of_notification,
    //             read_by_receiver: false
    //         })
    //         .throwOnError()
    //     })
    // }

    public async resetNotificationCounter(): Promise<void> {
        await this.notificationStoreService.notifications.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<FunctionSingleReturn<'reset_notification_counter'>> = await this.supabaseClient
            .rpc('reset_notification_counter')
            .single()
            .throwOnError()
        }, false)
    }

    public async updateReceiveFollowNotificationStatus(): Promise<void> {
        await this.notificationStoreService.notifications.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<FunctionSingleReturn<'update_receive_notifications_from_follow'>> = await this.supabaseClient
            .rpc('update_receive_notifications_from_follow', {
                new_status: true
            })
            .single()
            .throwOnError()
        }, true, 'You will not receive notifications anymore if someone follows you.')
    }
}
