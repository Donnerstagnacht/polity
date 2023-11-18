import {Injectable, signal, WritableSignal} from '@angular/core';
import {SessionStoreService} from "../../../core/services/session-store.service";
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class NotificationsStoreService {
    private notifications: WritableSignal<Tables<'notifications_by_user'>[] | null> = signal(null);

    constructor(
        private readonly sessionStoreService: SessionStoreService
    ) {
    }

    public selectNotifications(): WritableSignal<Tables<'notifications_by_user'>[] | null> {
        return this.notifications;
    }

    public resetNotifications(): void {
        this.notifications.set(null)
    }

    public mutateNotifications(notifications: Tables<'notifications_by_user'>[] | null): void {
        const mergeUpdatesWithStoreData: Tables<'notifications_by_user'>[] = {
            ...this.notifications(),
            ...notifications
        } as Tables<'notifications_by_user'>[]
        this.notifications.set(mergeUpdatesWithStoreData);
    }
}
