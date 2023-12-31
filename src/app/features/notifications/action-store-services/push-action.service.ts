import {Injectable} from '@angular/core';
import {SwPush} from "@angular/service-worker";
import {environment} from "../../../../environments/environment";
import {PushSubscriptionStringifies} from "../pushSubscription";
import {supabaseClient} from "../../../auth/supabase-client";
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {TuiAlertService} from "@taiga-ui/core";

@Injectable({
    providedIn: 'root'
})
export class PushActionService {
    private readonly VAPID_PUBLIC_KEY: string = environment.vapidPublicKey;
    private supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private swPush: SwPush,
        private tuiAlertService: TuiAlertService
    ) {
    }

    public async addPushSubscriber(pushSubscriptionStringifies: PushSubscriptionStringifies): Promise<void> {
        const response: PostgrestSingleResponse<FunctionSingleReturn<'upsert_push_subscription'>> = await this.supabaseClient.rpc('upsert_push_subscription', {
            endpoint: pushSubscriptionStringifies.endpoint,
            expirationtime: pushSubscriptionStringifies.expirationTime as string,
            auth: pushSubscriptionStringifies.keys.auth,
            p256dh: pushSubscriptionStringifies.keys.p256dh
        })
        .single()
        .throwOnError();

        if (response.error) {
            console.log(response.error)
            this.tuiAlertService.open(
                'Database error!',
                {
                    status: 'error',
                }).subscribe();
        } else {
            this.tuiAlertService.open(
                'Wir halten dich mit Push Nachrichten Up to Date!',
                {
                    status: 'success',
                }).subscribe();
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
                    status: 'error',
                }).subscribe();
        }
    }
}
