import {Injectable} from '@angular/core';
import {ObjectStoreService} from "../../../signal-store/object-store.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class NotificationSettingsStoreService {
    public notificationSettings: ObjectStoreService<SupabaseObjectReturn<'read_profile_notification_settings'>>

    constructor() {
        this.notificationSettings = new ObjectStoreService<SupabaseObjectReturn<'read_profile_notification_settings'>>();
    }
}
