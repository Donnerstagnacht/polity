import {Injectable} from '@angular/core';
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";
import {LoadingStoreService} from "../../../core/services/loading-store.service";
import {EntitiesStoreService} from "../../../core/services/entities-store.service";

@Injectable({
    providedIn: 'root'
})
export class NotificationsStoreService {
    public loading: LoadingStoreService;
    public notifications: EntitiesStoreService<Tables<'notifications_by_user'>>;
    // private notifications: WritableSignal<Tables<'notifications_by_user'>[]> = signal([]);

    // private readonly loading: WritableSignal<boolean> = signal(true);

    constructor() {
        this.loading = new LoadingStoreService();
        this.notifications = new EntitiesStoreService<Tables<'notifications_by_user'>>();
    }

    // public selectNotifications(): WritableSignal<Tables<'notifications_by_user'>[]> {
    //     return this.notifications;
    // }
    //
    // public resetNotifications(): void {
    //     this.notifications.set([])
    // }

    // public mutateNotifications(notifications: Tables<'notifications_by_user'>[]): void {
    //     // const mergeUpdatesWithStoreData: Tables<'notifications_by_user'>[] = {
    //     //     ...this.notifications(),
    //     //     ...notifications
    //     // } as Tables<'notifications_by_user'>[]
    //     console.log('object here?', Array.isArray(notifications), notifications)
    //     const mergeUpdatesWithStoreData: Tables<'notifications_by_user'>[] = [
    //         ...this.notifications(),
    //         ...notifications
    //     ]
    //     console.log('array here?', Array.isArray(mergeUpdatesWithStoreData), mergeUpdatesWithStoreData)
    //     this.notifications.set(mergeUpdatesWithStoreData);
    // }

    // selectLoading(): WritableSignal<boolean> {
    //     return this.loading;
    // }
    //
    // startLoading(): void {
    //     this.loading.set(true);
    // }
    //
    // stopLoading(): void {
    //     this.loading.set(false);
    // }
}
