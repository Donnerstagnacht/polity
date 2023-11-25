import {Injectable} from '@angular/core';
import {PlainFunctions} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class NotificationsStoreService {
    public notifications: ArrayStoreService<PlainFunctions<'select_notifications_of_users'>, {}>;

    constructor() {
        this.notifications = new ArrayStoreService<PlainFunctions<'select_notifications_of_users'>, {}>(true);
    }
}
