import {Injectable} from '@angular/core';
import {SupabaseArrayReturnConditional} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class NotificationsStoreService {
    public notifications: ArrayStoreService<SupabaseArrayReturnConditional<'select_notifications_of_users'>>;

    constructor() {
        this.notifications = new ArrayStoreService<SupabaseArrayReturnConditional<'select_notifications_of_users'>>(
            true
        );
    }
}
