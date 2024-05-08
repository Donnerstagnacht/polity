import {Injectable} from '@angular/core';
import {ObjectStoreService} from "../../../signal-store/object-store.service";
import {SupabaseArrayReturnConditional} from "../../../../../supabase/types/supabase.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class NotificationBadgeStoreService {
    public notificationBadge: ObjectStoreService<SupabaseArrayReturnConditional<'select_unread_notifications_counter'>>


    constructor() {
        this.notificationBadge = new ObjectStoreService<SupabaseArrayReturnConditional<'select_unread_notifications_counter'>>();
    }
}
