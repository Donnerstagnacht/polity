import {inject, Injectable} from '@angular/core';
import {BaseObjectStore} from '../../../store-signal-functions/object/base-object-store.service';
import {rpcObjectHandler} from '../../../store-signal-functions/object/rpcObjectHandlerFeature';
import {supabaseAuthenticatedClient} from '../../../auth/supabase-authenticated-client';
import {RealtimeChannel, RealtimePostgresUpdatePayload} from '@supabase/supabase-js';
import {
    SupabaseObjectReturn,
    SupabaseTable
} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {SessionStore} from '../../../auth/services/session.store';

@Injectable({
    providedIn: 'root'
})
export class NotificationCounterStore extends BaseObjectStore<'read_unread_notifications_counter'> {
    private sessionStore: SessionStore = inject(SessionStore);
    private readonly supabaseClient = supabaseAuthenticatedClient;

    private channel: RealtimeChannel = this.supabaseClient
                                           .channel('profiles_counters')
                                           .on<SupabaseTable<'profiles_counters'>>('postgres_changes', {
                                                   event: 'UPDATE',
                                                   schema: 'hidden',
                                                   table: 'profiles_counters',
                                                   filter: 'id=eq.' + this.sessionStore.getSessionId()
                                               },
                                               (payload: RealtimePostgresUpdatePayload<SupabaseTable<'profiles_counters'>>): void => {
                                                   console.log('payload', payload);
                                                   const testReturn: SupabaseObjectReturn<'read_unread_notifications_counter'> = {
                                                       unread_notifications_counter_: payload.new.unread_notifications_counter as number,
                                                       profile_id_: payload.new.id as string
                                                   };
                                                   this.data_.set(testReturn);
                                                   // this.notificationBadgeStoreService.notificationBadge.setObject(testReturn)
                                               }
                                           )
                                           .subscribe();

    constructor() {
        super({
            profile_id_: '',
            unread_notifications_counter_: 0
        });
    }

    public async read(): Promise<void> {
        const result = await rpcObjectHandler(
            {
                fn: 'read_unread_notifications_counter'
            },
            {
                useLoading: true,
                loadingState: this.loadingState_
            },
            {
                useStore: true,
                dataState: this.data_
            },

            {
                useError: true,
                errorStoreService: this.errorStoreService
            },
            {
                useSuccess: true,
                alertService: this.tuiAlertService,
                successMessage: 'NotificationBadge loaded!'
            }
        );
    }

    ngOnDestroy(): void {
        console.log('destoyed');
        supabaseAuthenticatedClient.removeAllChannels();
        // this.channel.unsubscribe()
    }

}
