import {Component} from '@angular/core';
import {AuthError} from "@supabase/supabase-js";
import {NotificationsStoreService} from "../services/notifications-store.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {UiStoreService} from "../services/ui-store.service";

@Component({
    selector: 'polity-sign-out',
    templateUrl: './sign-out.component.html',
    styleUrls: ['./sign-out.component.less']
})
export class SignOutComponent {

    constructor(
        private readonly notificationService: NotificationsStoreService,
        private readonly router: Router,
        private readonly authService: AuthenticationService,
        private readonly UIStoreService: UiStoreService
    ) {
    }

    protected async signOut(): Promise<void> {
        try {
            this.UIStoreService.setLoading(true)
            const authResponse: { error: AuthError | null } = await this.authService.signOut();
            if (authResponse.error) {
                throw authResponse.error;
            }
            await this.router.navigate(['/landing/sign-in']);
        } catch (error) {
            if (error instanceof Error) {
                this.notificationService.updateNotification(error.message, true);
            }
        } finally {
            this.UIStoreService.setLoading(false)
        }
    }

}
