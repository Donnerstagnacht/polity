import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationBadgeActionService {
    // private readonly supabaseClient = supabaseAuthenticatedClient;
    //
    // private channel: RealtimeChannel = this.supabaseClient
    // .channel('profiles_counters')
    // .on<SupabaseTable<'profiles_counters'>>('postgres_changes', {
    //         event: 'UPDATE',
    //         schema: 'hidden',
    //         table: 'profiles_counters',
    //         filter: 'id=eq.' + this.sessionStoreService.getSessionId()
    //     },
    //     (payload: RealtimePostgresUpdatePayload<SupabaseTable<'profiles_counters'>>): void => {
    //         console.log('payload', payload)
    //         const testReturn: SupabaseObjectReturn<'read_unread_notifications_counter'> = {
    //             unread_notifications_counter_: payload.new.unread_notifications_counter as number,
    //             profile_id_: payload.new.id as string
    //         }
    //         this.notificationBadgeStoreService.notificationBadge.setObject(testReturn)
    //     }
    // )
    // .subscribe();

    // constructor(
    //     private readonly notificationBadgeStoreService: NotificationBadgeStoreService,
    //     private readonly sessionStoreService: SessionStoreService
    // ) {
    // }

    // public async selectUnreadNotificationsCounter(): Promise<void> {
    //     const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_unread_notifications_counter'>> = await this.notificationBadgeStoreService.notificationBadge.manageSelectApiCall(async () => {
    //         return this.supabaseClient.rpc('read_unread_notifications_counter')
    //         .single()
    //         .throwOnError()
    //     })
    //     if (response.data) {
    //         this.notificationBadgeStoreService.notificationBadge.setObject(response.data);
    //     }
    // }

    // ngOnDestroy(): void {
    //     console.log('destoyed')
    //     supabaseAuthenticatedClient.removeAllChannels()
    //     // this.channel.unsubscribe()
    // }
}
