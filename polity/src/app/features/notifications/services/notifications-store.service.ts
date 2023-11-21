import {Injectable} from '@angular/core';
import {Functions} from "../../../../../supabase/types/supabase.shorthand-types";
import {EntitiesWrapperStoreService} from "../../../shared/services/entities-wrapper-store.service";

@Injectable({
    providedIn: 'root'
})
export class NotificationsStoreService {
    public notifications: EntitiesWrapperStoreService<Functions<'select_notifications_of_users'>>;

    constructor() {
        this.notifications = new EntitiesWrapperStoreService<Functions<'select_notifications_of_users'>>();
    }
}
