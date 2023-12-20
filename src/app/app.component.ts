import {Component, WritableSignal} from '@angular/core';
import {AuthenticationService} from "./auth/services/authentication.service";
import {SessionStoreService} from "./auth/services/session.store.service";
import {AuthChangeEvent, Session} from "@supabase/supabase-js";
import {ErrorStoreService} from "./signal-store/error-store.service";
import {RouterOutlet} from '@angular/router';
import {TuiNotificationModule} from '@taiga-ui/core/components/notification';
import {TuiRootModule} from '@taiga-ui/core';
import {SwUpdate} from "@angular/service-worker";

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
        private swUpdate: SwUpdate
    ) {
        this.authService.authChanges((_: AuthChangeEvent, session: Session | null): void => {
            this.sessionStoreService.setAuthData(session);
        })
        this.notification = this.errorStoreService.selectError();
        this.showErrorMessage = this.errorStoreService.selectShowError()
    }

    ngOnInit() {
        if (this.swUpdate.isEnabled) {

            this.swUpdate.versionUpdates.subscribe(() => {

                if (confirm("New version available. Load New Version?")) {

                    window.location.reload();
                }
            });
        }
    }

    onClose(): void {
        this.errorStoreService.setErrorStatus(false)
    }
}
