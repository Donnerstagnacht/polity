import {Injectable} from '@angular/core';
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";
import {EntitiesWrapperStoreService} from "../../../shared/services/entities-wrapper-store.service";

@Injectable({
    providedIn: 'root'
})
export class NotificationsStoreService {
    public notifications: EntitiesWrapperStoreService<Tables<'notifications_by_user'>>;

    constructor() {
        this.notifications = new EntitiesWrapperStoreService<Tables<"notifications_by_user">>();
    }
}
