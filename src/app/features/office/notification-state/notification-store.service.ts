import {inject, Injectable} from '@angular/core';
import {BaseArrayStore} from '@polity-signal-store/array/base-array-store.service';
import {rpcArrayHandler} from '@polity-signal-store/array/rpcArrayHandlerFeature';
import {rpcObjectHandler} from '@polity-signal-store/object/rpcObjectHandlerFeature';
import {RealtimeChannel, RealtimePostgresInsertPayload} from '@supabase/supabase-js';
import {supabaseAuthenticatedClient} from '../../../auth/supabase-authenticated-client';
import {SupabaseTable} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {SessionStore} from '../../../auth/state/session.store';

@Injectable({providedIn: 'root'})
export class NotificationsStore extends BaseArrayStore<'notifications_of_user_read'> {
    private readonly supabaseClient = supabaseAuthenticatedClient;
    private currentNotificationsChannel: RealtimeChannel | null = null;
    private sessionStore: SessionStore = inject(SessionStore);

    constructor() {
        super({
            loading: false,
            dataRequested: false
        });
    }


    public async read(): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'notifications_of_user_read'
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
            },
            {
                useExtractImgUrl: true,
                key: 'profile_image_',
                bucket: 'profile_images'
            }
        );
    }

    public async resetCounter(): Promise<void> {
        await rpcObjectHandler(
            {
                fn: 'reset_profile_notification_counter'
            },
            {
                useLoading: false
            },
            {
                useStore: false
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

    public async updateReceiveFollowNotificationStatus(): Promise<void> {
        await rpcObjectHandler(
            {
                fn: 'profiles_receive_notifications_from_follow_update'
            },
            {
                useLoading: true,
                loadingState: this.loadingState_
            },
            {
                useStore: false
            },
            {
                useError: true,
                errorStoreService: this.errorStoreService
            },
            {
                useSuccess: true,
                alertService: this.tuiAlertService,
                successMessage: 'Notifications counter reset!'
            }
        );
    }

    public subscribeToRealtimeNotifications(): void {
        const channel: RealtimeChannel = this.createNewChannel();
        channel.subscribe();
    }

    public async unsubscribeToRealtimeNotifications(): Promise<void> {
        const response: 'ok' | 'error' | 'timed out' = await this.supabaseClient.removeChannel(this.currentNotificationsChannel as RealtimeChannel);
        console.log('response', response);
    }

    private createNewChannel(): RealtimeChannel {
        const channelId: number = Math.floor(Math.random() * 1000000);
        const channelName: string = `channel-${channelId}`;

        const notificationsChannel: RealtimeChannel = supabaseAuthenticatedClient
        .channel(channelName)
        .on('postgres_changes', {
                event: 'INSERT',
                schema: 'hidden',
                table: 'notifications_by_user',
                filter: 'receiver=eq.' + this.sessionStore.getSessionId()
            },
            async (payload: RealtimePostgresInsertPayload<SupabaseTable<any>>): Promise<void> => {

                // WORKING SOLUTION
                // const response: PostgrestSingleResponse<SupabaseObjectReturn<'notifications_of_user_read'>[]> = await this.supabaseClient
                //                                                                                                           .rpc('notifications_of_user_read')
                //
                // if (response.data) {
                //     this.notificationStoreService.notifications.setObjects(response.data)
                // }
                await this.read();
            }
        );
        this.currentNotificationsChannel = notificationsChannel;
        return notificationsChannel;
    }

}
