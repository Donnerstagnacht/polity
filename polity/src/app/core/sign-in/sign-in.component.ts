import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TUI_PASSWORD_TEXTS, TUI_VALIDATION_ERRORS, tuiInputPasswordOptionsProvider} from "@taiga-ui/kit";
import {of} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";

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
        private readonly authService: AuthenticationService,
    ) {
    }

    protected async onSignIn(): Promise<void> {
        await this.authService.signIn({
            email: this.signInForm.value.email as string,
            password: this.signInForm.value.password as string
        });
        this.signInForm.reset();
    }
}
