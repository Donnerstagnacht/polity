import {Injectable} from '@angular/core';
import {NotificationBadgeStoreService} from "./notification-badge.store.service";
import {
    PostgrestSingleResponse,
    RealtimeChannel,
    RealtimePostgresUpdatePayload,
    SupabaseClient
} from "@supabase/supabase-js";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {supabaseClient} from "../../../auth/supabase-client";
import {FunctionSingleReturn, SupabaseTable} from "../../../../../supabase/types/supabase.shorthand-types";
import {SessionStoreService} from "../../../auth/services/session.store.service";

@Injectable({
    providedIn: 'root'
})
export class NotificationBadgeActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    private channel: RealtimeChannel = this.supabaseClient
    .channel('profiles_counters')
    .on<SupabaseTable<'profiles_counters'>>('postgres_changes', {
            event: 'UPDATE',
            schema: 'authenticated_access',
            table: 'profiles_counters',
            filter: 'id=eq.' + this.sessionStoreService.getSessionId()
        },
        (payload: RealtimePostgresUpdatePayload<SupabaseTable<'profiles_counters'>>): void => {
            console.log('payload', payload)
            const testReturn: FunctionSingleReturn<'select_unread_notifications_counter'> = {
                unread_notifications_counter: payload.new.unread_notifications_counter as number,
                profile_id: payload.new.id as string
            }
            this.notificationBadgeStoreService.notificationBadge.setObject(testReturn)
        }
    )
    .subscribe();

    constructor(
        private readonly notificationBadgeStoreService: NotificationBadgeStoreService,
        private readonly sessionStoreService: SessionStoreService
    ) {
    }

    public async selectUnreadNotificationsCounter(): Promise<void> {
        await this.notificationBadgeStoreService.notificationBadge.wrapSelectFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<FunctionSingleReturn<'select_unread_notifications_counter'>> = await this.supabaseClient.rpc('select_unread_notifications_counter')
            .single()
            .throwOnError()
            if (response.data) {
                this.notificationBadgeStoreService.notificationBadge.setObject(response.data);
            }
        })
    }

    ngOnDestroy(): void {
        console.log('destoyed')
        supabaseClient.removeAllChannels()
        // this.channel.unsubscribe()
    }
}
