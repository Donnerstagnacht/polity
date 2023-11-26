import {Injectable} from '@angular/core';
import {ObjectStoreService} from "../../../signal-store/object-store.service";
import {PlainFunctions} from "../../../../../supabase/types/supabase.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class NotificationBadgeStoreService {
    public notificationBadge: ObjectStoreService<PlainFunctions<'select_unread_notifications_counter'>>


    constructor() {
        this.notificationBadge = new ObjectStoreService<PlainFunctions<'select_unread_notifications_counter'>>();
    }
}
