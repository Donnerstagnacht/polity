import {Component, WritableSignal} from '@angular/core';
import {AuthenticationService} from "./core/services/authentication.service";
import {SessionStoreService} from "./core/services/session-store.service";
import {AuthChangeEvent, Session} from "@supabase/supabase-js";
import {ErrorStoreService} from "./signal-store/error-store.service";

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
        private errorStoreService: ErrorStoreService
    ) {
        this.authService.authChanges((_: AuthChangeEvent, session: Session | null): void => {
            this.sessionStoreService.setAuthData(session);
        })
        this.notification = this.errorStoreService.selectError();
        this.showErrorMessage = this.errorStoreService.selectShowError()
    }

    onClose() {
        this.errorStoreService.setErrorStatus(false)
    }
}
