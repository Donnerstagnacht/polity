import {Injectable} from '@angular/core';
import {
    PostgrestSingleResponse,
    RealtimeChannel,
    RealtimePostgresInsertPayload,
    SupabaseClient
} from "@supabase/supabase-js";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {NotificationsStoreService} from "./notifications.store.service";
import {
    FunctionSingleReturn,
    FunctionTableReturn,
    Tables
} from "../../../../../supabase/types/supabase.shorthand-types";
import {supabaseClient} from "../../../auth/supabase-client";
import {SessionStoreService} from "../../../auth/services/session.store.service";
import {ProfileActionService} from "../../profile/action-store-services/profile.action.service";

@Injectable({
    providedIn: 'root'
})
export class NotificationsActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;
    private currentNotificationsChannel: RealtimeChannel | null = null;

    constructor(
        private readonly notificationStoreService: NotificationsStoreService,
        private sessionStoreService: SessionStoreService,
        private profileActionService: ProfileActionService
    ) {
    }

    public async selectNotifications(): Promise<void> {
        await this.notificationStoreService.notifications.wrapSelectFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<FunctionTableReturn<'select_notifications_of_users'>> = await this.supabaseClient
            .rpc('select_notifications_of_users')
            .throwOnError()
            if (response.data) {
                const finalArray: FunctionTableReturn<'select_notifications_of_users'> = await this.profileActionService.transformImageNamesToUrls(response.data, 'profile_image')
                this.notificationStoreService.notifications.setObjects(finalArray);
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

    public subscribeToRealtimeNotifications(): void {
        const channel: RealtimeChannel = this.createNewChannel()
        channel.subscribe()
    }

    public async unsubscribeToRealtimeNotifications(): Promise<void> {
        const response: "ok" | "error" | "timed out" = await this.supabaseClient.removeChannel(this.currentNotificationsChannel as RealtimeChannel)
        console.log('response', response)
    }

    private createNewChannel(): RealtimeChannel {
        const channelId: number = Math.floor(Math.random() * 1000000);
        const channelName: string = `channel-${channelId}`;

        const notificationsChannel: RealtimeChannel = supabaseClient
        .channel(channelName)
        .on('postgres_changes', {
                event: 'INSERT',
                schema: 'authenticated_access',
                table: 'notifications_by_user',
                filter: 'receiver=eq.' + this.sessionStoreService.getSessionId()
            },
            async (payload: RealtimePostgresInsertPayload<Tables<any>>): Promise<void> => {

                // WORKING SOLUTION
                const response: PostgrestSingleResponse<FunctionTableReturn<'select_notifications_of_users'>> = await this.supabaseClient
                .rpc('select_notifications_of_users')

                if (response.data) {
                    this.notificationStoreService.notifications.setObjects(response.data)
                }
            }
        )
        this.currentNotificationsChannel = notificationsChannel;
        return notificationsChannel;
    }
}
