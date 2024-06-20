import {Injectable} from '@angular/core';
import {SwPush} from '@angular/service-worker';
import {environment} from '../../../../environments/environment';
import {PushSubscriptionStringifies} from '@polity-office/pushSubscription.type';
import {supabaseAuthenticatedClient} from '../../../auth/supabase-authenticated-client';
import {PostgrestSingleResponse} from '@supabase/supabase-js';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {TuiAlertService} from '@taiga-ui/core';

@Injectable({providedIn: 'root'})
export class PushActionService {
    private readonly VAPID_PUBLIC_KEY: string = environment.vapidPublicKey;
    private supabaseClient = supabaseAuthenticatedClient;

    constructor(
        private swPush: SwPush,
        private tuiAlertService: TuiAlertService
    ) {
    }

    public async addPushSubscriber(pushSubscriptionStringifies: PushSubscriptionStringifies): Promise<void> {
        const response: PostgrestSingleResponse<SupabaseObjectReturn<'upsert_push_subscription'>> = await this.supabaseClient.rpc('upsert_push_subscription', {
            _endpoint: pushSubscriptionStringifies.endpoint,
            _expirationtime: pushSubscriptionStringifies.expirationTime as string,
            _auth: pushSubscriptionStringifies.keys.auth,
            _p256dh: pushSubscriptionStringifies.keys.p256dh
        })
                                                                                                              .single()
                                                                                                              .throwOnError();

        if (response.error) {
            console.log(response.error);
            this.tuiAlertService.open(
                'Database error!',
                {
                    status: 'error'
                }
            ).subscribe();
        } else {
            this.tuiAlertService.open(
                'Wir halten dich mit Push Nachrichten Up to Date!',
                {
                    status: 'success'
                }
            ).subscribe();
        }
    }

    public async subscribeToNotifications(): Promise<void> {
        try {
            const pushSubscription: PushSubscription = await this.swPush.requestSubscription({
                serverPublicKey: this.VAPID_PUBLIC_KEY
            });
            const pushParsed: PushSubscriptionStringifies = JSON.parse(JSON.stringify(pushSubscription));
            await this.addPushSubscriber(pushParsed);
        } catch (error) {
            this.tuiAlertService.open(
                'Push subscription ist nicht supported. Probiere einen anderen Browser bitte!',
                {
                    status: 'error'
                }
            ).subscribe();
        }
    }
}
