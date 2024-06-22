export type PushSubscriptionStringifies = {
    endpoint: string,
    expirationTime: string | null,
    keys: {
        auth: string,
        p256dh: string
    }
}
