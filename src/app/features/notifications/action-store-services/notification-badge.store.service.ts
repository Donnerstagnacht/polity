import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {ObjectStoreService} from "../../../store-signal-class/object-store.service";

@Injectable({
    providedIn: 'root'
})
export class NotificationBadgeStoreService {
    public notificationBadge: ObjectStoreService<SupabaseObjectReturn<'read_unread_notifications_counter'>>


    constructor() {
        this.notificationBadge = new ObjectStoreService<SupabaseObjectReturn<'read_unread_notifications_counter'>>();
    }
}
