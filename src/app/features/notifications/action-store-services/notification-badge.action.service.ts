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
import {SessionStoreService} from "../../../auth/services/session.store.service";
import {PlainFunctions, Tables} from "../../../../../supabase/types/supabase.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class NotificationBadgeActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    private channel: RealtimeChannel = this.supabaseClient
    .channel('profiles_counters')
    .on<Tables<'profiles_counters'>>('postgres_changes', {
            event: 'UPDATE',
            schema: 'public',
            table: 'profiles_counters',
        },
        (payload: RealtimePostgresUpdatePayload<Tables<'profiles_counters'>>): void => {
            const testReturn: PlainFunctions<'select_unread_notifications_counter'> = {
                unread_notifications_counter: payload.new.unread_notifications_counter,
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
            const loggedInUserId: string = this.sessionStoreService.getSessionId() as string;
            const response: PostgrestSingleResponse<PlainFunctions<'select_unread_notifications_counter'>> = await this.supabaseClient.rpc('select_unread_notifications_counter',
                {
                    user_id: loggedInUserId
                }
            )
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
        this.channel.unsubscribe()
    }
}
