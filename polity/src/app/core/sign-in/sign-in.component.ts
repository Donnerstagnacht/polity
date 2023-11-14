import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TUI_PASSWORD_TEXTS, TUI_VALIDATION_ERRORS, tuiInputPasswordOptionsProvider} from "@taiga-ui/kit";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {SessionStoreService} from "../services/session-store.service";
import {AuthTokenResponse} from "@supabase/supabase-js";
import {NotificationsStoreService} from "../services/notifications-store.service";
import {UiStoreService} from "../services/ui-store.service";

@Component({
    selector: 'polity-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        tuiInputPasswordOptionsProvider({
            icons: {
                hide: 'tuiIconLockLarge',
                show: 'tuiIconUnlockLarge'
            },
        }),
        {
            provide: TUI_PASSWORD_TEXTS,
            useValue: of([''])
        },
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: 'Bitte ausfüllen.',
                email: 'Bitte eine gültige E-Mail-Adresse eingeben.',
                minlength: ({requiredLength}: {
                    requiredLength: string
                }) =>
                    of(`Passwort benötigt mindestens ${requiredLength} Zeichen.`)
            }
        }
    ]
})
export class SignInComponent {
    protected signInForm: FormGroup<{
        email: FormControl<string | null>,
        password: FormControl<string | null>
    }> = new FormGroup({
        email: new FormControl(
            'test1@gmail.com',
            [Validators.required, Validators.email]),
        password: new FormControl(
            '010893',
            [Validators.required, Validators.minLength(6)]),
    })

    constructor(
        private readonly router: Router,
        private readonly authService: AuthenticationService,
        private readonly sessionStoreService: SessionStoreService,
        private readonly notificationService: NotificationsStoreService,
        private readonly UIStoreService: UiStoreService
    ) {
    }

    protected async onSignIn(): Promise<void> {
        try {
            this.UIStoreService.setLoading(true)
            const authResponse: AuthTokenResponse = await this.authService.signIn({
                email: this.signInForm.value.email as string,
                password: this.signInForm.value.password as string
            })
            if (authResponse.error) {
                throw authResponse.error
            }
            await this.sessionStoreService.setAuthData(authResponse.data.session)
            await this.router.navigate(['/profile', authResponse.data.session.user.id]);
        } catch (error) {
            if (error instanceof Error) {
                this.notificationService.updateNotification(error.message, true);
            }
        } finally {
            this.signInForm.reset();
            this.UIStoreService.setLoading(false)
        }
    }
}
