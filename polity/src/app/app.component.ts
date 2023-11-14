import {Component, WritableSignal} from '@angular/core';
import {AuthenticationService} from "./core/services/authentication.service";
import {SessionStoreService} from "./core/services/session-store.service";
import {NotificationsStoreService} from "./core/services/notifications-store.service";
import {AuthChangeEvent, Session} from "@supabase/supabase-js";

@Component({
    selector: 'polity-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    showErrorMessage: WritableSignal<boolean>;
    notification: WritableSignal<string>;

    constructor(
        private readonly authService: AuthenticationService,
        private sessionStoreService: SessionStoreService,
        private notificationService: NotificationsStoreService
    ) {
        this.authService.authChanges((_: AuthChangeEvent, session: Session | null): void => {
            this.sessionStoreService.setAuthData(session);
        })
        this.notification = this.notificationService.selectNotification();
        this.showErrorMessage = this.notificationService.selectShowNotification()
    }

    onClose() {
        this.notificationService.setNotificationStatus(false)
    }
}
