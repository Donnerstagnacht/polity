import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {ObjectStoreService} from "../../../store-signal-class/object-store.service";

@Injectable({
    providedIn: 'root'
})
export class NotificationSettingsStoreService {
    public notificationSettings: ObjectStoreService<SupabaseObjectReturn<'read_profile_notification_settings'>>

    constructor() {
        this.notificationSettings = new ObjectStoreService<SupabaseObjectReturn<'read_profile_notification_settings'>>();
    }
}
