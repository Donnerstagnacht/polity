import {Component, WritableSignal} from '@angular/core';
import {AuthenticationService} from "./auth/services/authentication.service";
import {SessionStoreService} from "./auth/services/session.store.service";
import {AuthChangeEvent, Session} from "@supabase/supabase-js";
import {ErrorStoreService} from "./signal-store/error-store.service";
import {RouterOutlet} from '@angular/router';
import {TuiNotificationModule} from '@taiga-ui/core/components/notification';
import {TuiRootModule} from '@taiga-ui/core';

@Component({
    selector: 'polity-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    standalone: true,
    imports: [
        TuiRootModule,
        TuiNotificationModule,
        RouterOutlet
    ]
})
export class AppComponent {
    showErrorMessage: WritableSignal<boolean>;
    notification: WritableSignal<string>;

    constructor(
        private readonly authService: AuthenticationService,
        private sessionStoreService: SessionStoreService,
        private errorStoreService: ErrorStoreService,
    ) {
        this.authService.authChanges((_: AuthChangeEvent, session: Session | null): void => {
            this.sessionStoreService.setAuthData(session);
        })
        this.notification = this.errorStoreService.selectError();
        this.showErrorMessage = this.errorStoreService.selectShowError()
    }

    onClose(): void {
        this.errorStoreService.setErrorStatus(false)
    }
}
