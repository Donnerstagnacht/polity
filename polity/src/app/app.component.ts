import {Component, WritableSignal} from '@angular/core';
import {AuthenticationService} from "./core/services/authentication.service";
import {SessionStoreService} from "./core/services/session-store.service";
import {ErrorStoreService} from "./core/services/error-store.service";
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
        private notificationService: ErrorStoreService
    ) {
        this.authService.authChanges((_: AuthChangeEvent, session: Session | null): void => {
            this.sessionStoreService.setAuthData(session);
        })
        this.notification = this.notificationService.selectError();
        this.showErrorMessage = this.notificationService.selectShowError()
    }

    onClose() {
        this.notificationService.setErrorStatus(false)
    }
}
