import {Injectable} from '@angular/core';
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";
import {EntitiesStoreService} from "../../../shared/services/entities-store.service";

@Injectable({
    providedIn: 'root'
})
export class NotificationsStoreService {
    public notifications: EntitiesStoreService<Tables<'notifications_by_user'>>;

    constructor() {
        this.notifications = new EntitiesStoreService<Tables<'notifications_by_user'>>();
    }
}
