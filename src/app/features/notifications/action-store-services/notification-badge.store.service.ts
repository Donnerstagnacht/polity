import {Injectable} from '@angular/core';
import {ObjectStoreService} from "../../../signal-store/object-store.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class NotificationBadgeStoreService {
    public notificationBadge: ObjectStoreService<SupabaseObjectReturn<'read_unread_notifications_counter'>>


    constructor() {
        this.notificationBadge = new ObjectStoreService<SupabaseObjectReturn<'read_unread_notifications_counter'>>();
    }
}
