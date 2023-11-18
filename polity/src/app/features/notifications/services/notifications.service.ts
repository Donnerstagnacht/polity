import {Injectable} from '@angular/core';
import {SupabaseClient} from "@supabase/supabase-js";
import {DatabaseModified} from "../../../../../supabase/types/supabase.modified";
import {supabaseClient} from "../../../core/services/supabase-client";
import {SessionStoreService} from "../../../core/services/session-store.service";
import {NotificationsStoreService} from "./notifications-store.service";

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    private readonly supabaseClient: SupabaseClient<DatabaseModified> = supabaseClient;


    constructor(
        private readonly sessionStoreService: SessionStoreService,
        private readonly notificationStoreService: NotificationsStoreService,
        private readonly mess
    ) {
    }

    public async selectNotifications(): Promise<void> {
        try {

        } catch (error: any) {
            this.notificationStoreService.updateNotification(error.message, true);
        }
    }

    public async insertNotification(): Promise<void> {

    }

    public async resetNotificationCounter(): Promise<void> {

    }
}
