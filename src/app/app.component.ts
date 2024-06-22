import {Component, inject, WritableSignal} from '@angular/core';
import {AuthChangeEvent, Session} from '@supabase/supabase-js';
import {RouterOutlet} from '@angular/router';
import {TuiNotificationModule} from '@taiga-ui/core/components/notification';
import {TuiRootModule} from '@taiga-ui/core';
import {SwUpdate} from '@angular/service-worker';
import {SessionStore} from './auth/state/session.store';
import {AuthenticationService} from './auth/state/authentication.service';
import {ErrorStoreService} from '@polity-signal-store/error-store.service';
import {PushActionService} from '@polity-office/notification-state/push-action.service';

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
    private sessionStore: SessionStore = inject(SessionStore);

    constructor(
        private readonly authService: AuthenticationService,
        private errorStoreService: ErrorStoreService,
        private pushService: PushActionService,
        private swUpdate: SwUpdate
    ) {
        this.authService.authChanges((_: AuthChangeEvent, session: Session | null): void => {
            this.sessionStore.setAuthData(session);
        });
        this.notification = this.errorStoreService.selectError();
        this.showErrorMessage = this.errorStoreService.selectShowError();
    }

    ngOnInit(): void {
        this.subscribeToNotifications();
        if (this.swUpdate.isEnabled) {
            this.swUpdate.versionUpdates.subscribe((): void => {
                if (confirm('New version available. Load New Version?')) {
                    window.location.reload();
                }
            });
        }
    }

    onClose(): void {
        this.errorStoreService.setErrorStatus(false);
    }

    subscribeToNotifications(): void {
        this.pushService.subscribeToNotifications();
    }
}
