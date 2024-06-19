import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationsActionService {
    // private readonly supabaseClient = supabaseAuthenticatedClient;
    // private currentNotificationsChannel: RealtimeChannel | null = null;
    //
    // constructor(
    //     private readonly notificationStoreService: NotificationsStoreService,
    //     private sessionStoreService: SessionStoreService,
    //     private profileActionService: ProfileActionService
    // ) {
    // }

    // public async selectNotifications(): Promise<void> {
    //     const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_notifications_of_user'>[]> = await this.notificationStoreService.notifications.manageSelectApiCall(async () => {
    //         return this.supabaseClient
    //         .rpc('read_notifications_of_user')
    //         .throwOnError()
    //     })
    //     if (response.data) {
    //         const finalArray: SupabaseObjectReturn<'read_notifications_of_user'>[] = await this.profileActionService.transformImageNamesToUrls(response.data, 'profile_image_')
    //         this.notificationStoreService.notifications.setObjects(finalArray);
    //     }
    // }

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

    // public async resetNotificationCounter(): Promise<void> {
    //     const response: PostgrestSingleResponse<SupabaseObjectReturn<'reset_profile_notification_counter'>> = await this.notificationStoreService.notifications.manageUpdateApiCall(async () => {
    //         return this.supabaseClient
    //         .rpc('reset_profile_notification_counter')
    //         .single()
    //     }, false)
    // }

    // public async updateReceiveFollowNotificationStatus(): Promise<void> {
    //     const response: PostgrestSingleResponse<SupabaseObjectReturn<'update_profile_receive_notifications_from_follow'>> = await this.notificationStoreService.notifications.manageUpdateApiCall(async () => {
    //         return this.supabaseClient
    //         .rpc('update_profile_receive_notifications_from_follow', {
    //             _new_status: true
    //         })
    //         .single()
    //     }, true, 'You will not receive notifications anymore if someone follows you.')
    // }

    // public subscribeToRealtimeNotifications(): void {
    //     const channel: RealtimeChannel = this.createNewChannel()
    //     channel.subscribe()
    // }
    //
    // public async unsubscribeToRealtimeNotifications(): Promise<void> {
    //     const response: "ok" | "error" | "timed out" = await this.supabaseClient.removeChannel(this.currentNotificationsChannel as RealtimeChannel)
    //     console.log('response', response)
    // }
    //
    // private createNewChannel(): RealtimeChannel {
    //     const channelId: number = Math.floor(Math.random() * 1000000);
    //     const channelName: string = `channel-${channelId}`;
    //
    //     const notificationsChannel: RealtimeChannel = supabaseAuthenticatedClient
    //     .channel(channelName)
    //     .on('postgres_changes', {
    //             event: 'INSERT',
    //             schema: 'hidden',
    //             table: 'notifications_by_user',
    //             filter: 'receiver=eq.' + this.sessionStoreService.getSessionId()
    //         },
    //         async (payload: RealtimePostgresInsertPayload<SupabaseTable<any>>): Promise<void> => {
    //
    //             // WORKING SOLUTION
    //             const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_notifications_of_user'>[]> = await this.supabaseClient
    //             .rpc('read_notifications_of_user')
    //
    //             if (response.data) {
    //                 this.notificationStoreService.notifications.setObjects(response.data)
    //             }
    //         }
    //     )
    //     this.currentNotificationsChannel = notificationsChannel;
    //     return notificationsChannel;
    // }
}
