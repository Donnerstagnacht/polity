import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class NotificationsStoreService {
    public notifications: ArrayStoreService<SupabaseObjectReturn<'select_notifications_of_users'>>;

    constructor() {
        this.notifications = new ArrayStoreService<SupabaseObjectReturn<'select_notifications_of_users'>>(
            true
        );
    }
}
