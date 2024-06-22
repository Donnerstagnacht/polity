import {inject, Injectable} from '@angular/core';
import {supabaseAuthenticatedClient} from '../../../auth/supabase-authenticated-client';
import {RealtimeChannel, RealtimePostgresUpdatePayload} from '@supabase/supabase-js';
import {
    SupabaseObjectReturn,
    SupabaseTable
} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {SessionStore} from '../../../auth/state/session.store';
import {rpcObjectHandler} from '@polity-signal-store/object/rpcObjectHandlerFeature';
import {BaseObjectStore} from '@polity-signal-store/object/base-object-store.service';

@Injectable({providedIn: 'root'})
export class NotificationCounterStore extends BaseObjectStore<'unread_notifications_counter_read'> {
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
                                                   const testReturn: SupabaseObjectReturn<'unread_notifications_counter_read'> = {
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
                fn: 'unread_notifications_counter_read'
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
                useSuccess: false
            }
        );
    }

    ngOnDestroy(): void {
        console.log('destoyed');
        supabaseAuthenticatedClient.removeAllChannels();
        // this.channel.unsubscribe()
    }

}
