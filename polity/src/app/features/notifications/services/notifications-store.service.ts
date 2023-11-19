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

    constructor() {
        this.loading = new LoadingStoreService();
        this.notifications = new EntitiesStoreService<Tables<'notifications_by_user'>>();
    }
}
