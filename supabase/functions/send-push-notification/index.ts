// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import {InsertPayload} from '../../types/supabase.webhooks.types.ts'
import {TablesAuthenticatedAccess} from '../../types/supabase_authenticated_access.ts'
import {createClient} from 'https://esm.sh/@supabase/supabase-js'
import * as webPush from "https://dev.jspm.io/web-push"
// import { FunctionTableReturn } from '../../types/supabase.shorthand-types.ts'

type PushsSubscription = {
  id: string,
  endpoint: string,
  expirationtime: string| null,
  auth: string,
  p256dh: string
}[]

console.log("Hello from Functions! v2.1")

// TODO: THIS FUNCTION DOES NOT WORK
// I THINK WEB-PUSH LIBRARY IS NOT SUPPORTED IN DENO
// CHANGE LIBRARY; MAKE LIBRARY WORK OR SWITCH TO SUPABASE ONE SIGNAL OR EXPO
Deno.serve(async (req) => {
    try {
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            {global: {headers: {Authorization: req.headers.get('Authorization')!}}}
        )

        const webhookPayload: InsertPayload<TablesAuthenticatedAccess<'notifications_by_user'>> = await req.json()
        console.log('webhookPayload', webhookPayload)
        console.log('SUPABASE_URL', Deno.env.get('SUPABASE_URL'))
        console.log('SUPABASE_ANON_KEY', Deno.env.get('SUPABASE_ANON_KEY'))
        console.log('Authorization: ', req.headers.get('Authorization')!)

        const response = await supabase.rpc('select_all_push_subscriptions_of_user', {user_to_be_notified: webhookPayload.record.receiver});
        // const response: PostgrestResponse<any> = await supabase.rpc('select_all_push_subscriptions_of_user', {user_to_be_notified: webhookPayload.record.receiver});

        const pushSubscriptions: PushsSubscription = response.data;
        console.log('data from database', pushSubscriptions)

        const vapidKeys = {
          publicKey: 'BL8N69j1Xo5NCPPFqkuf7VQqPTkSLi5D34bV7HTe079sffnQi_6B44o9oCCud9Y4TTye64ZV2XgPyoE91ta7OHs',
          privateKey: '<The private Key>',
        }

        console.log('vapidKeys.publicKey', vapidKeys.privateKey)
        console.log('vapidKeys.publicKey', vapidKeys.privateKey)

        console.log('before webPushConstant')
        const webpush = webPush;
        console.log('before setGCMAPIKey')
        webpush.setGCMAPIKey('<The GCM API Key>'); // TODO: THIS LINE times out the function, webpush seems to not exist
        console.log('before setVapidDetails')
        webpush.setVapidDetails(
          'mailto:example@yourdomain.org',
          vapidKeys.publicKey,
          vapidKeys.privateKey
        );

        pushSubscriptions.forEach(pushSubscription => {
          console.log('response data', pushSubscription)
          // This is the same output of calling JSON.stringify on a PushSubscription
          const pushSubscription2 = {
            endpoint: pushSubscription.endpoint,
            keys: {
              auth: pushSubscription.auth,
              p256dh: pushSubscription.p256dh
            }
          };
          console.log('before send pushNotification')
          webpush.sendNotification(pushSubscription2, 'Your Push Payload Text');
        })

        console.log('response error', response.error)

        if (response.error) {
            throw response.error
        }

        return new Response(JSON.stringify({pushSubscriptions}), {
            headers: {'Content-Type': 'application/json'},
            status: 200,
        })
    } catch (error) {
        return new Response(String(error?.message ?? error), {status: 500})
    }

})

