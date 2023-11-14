import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TUI_PASSWORD_TEXTS, TUI_VALIDATION_ERRORS, tuiInputPasswordOptionsProvider} from "@taiga-ui/kit";
import {of} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {AuthResponse,} from "@supabase/supabase-js";
import {NotificationsStoreService} from "../services/notifications-store.service";
import {UiStoreService} from "../services/ui-store.service";

@Component({
    selector: 'polity-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.less'],
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
export class SignUpComponent {
    protected signUpForm: FormGroup<{
        email: FormControl<string | null>,
        password: FormControl<string | null>
    }> = new FormGroup({
        email: new FormControl(
            'email',
            [Validators.required, Validators.email]),
        password: new FormControl(
            'password',
            [Validators.required, Validators.minLength(6)]),
    })

    constructor(
        private readonly supabase: AuthenticationService,
        private readonly router: Router,
        private readonly notificationService: NotificationsStoreService,
        private readonly UIStoreService: UiStoreService
    ) {
    }

    protected async onSignUp(): Promise<void> {
        try {
            this.UIStoreService.setLoading(true)
            const authResponse: AuthResponse = await this.supabase.signUp({
                email: this.signUpForm.value.email as string,
                password: this.signUpForm.value.password as string
            })
            if (authResponse.error) {
                throw authResponse.error
            }
            await this.router.navigate(['/landing/sign-in'])
        } catch (error) {
            if (error instanceof Error) {
                this.notificationService.updateNotification(error.message, true)
            }
        } finally {
            this.signUpForm.reset();
            this.UIStoreService.setLoading(false)
        }
    }
}
