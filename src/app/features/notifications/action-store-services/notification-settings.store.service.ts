import {Injectable} from '@angular/core';
import {ObjectStoreService} from "../../../signal-store/object-store.service";
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class NotificationSettingsStoreService {
    public notificationSettings: ObjectStoreService<FunctionSingleReturn<'select_user_notification_settings'>>

    constructor() {
        this.notificationSettings = new ObjectStoreService<FunctionSingleReturn<'select_user_notification_settings'>>();
    }
}
