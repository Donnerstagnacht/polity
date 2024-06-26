import {Component} from '@angular/core';
import {
    TUI_PASSWORD_TEXTS,
    TUI_VALIDATION_ERRORS,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiInputPasswordModule,
    tuiInputPasswordOptionsProvider
} from '@taiga-ui/kit';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiButtonModule, TuiErrorModule, TuiSvgModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {CommonModule} from '@angular/common';
import {of} from 'rxjs';
import {AuthenticationService} from '../state/authentication.service';

@Component({
    selector: 'polity-sign-up',
    templateUrl: './sign-up.page.html',
    styleUrls: ['./sign-up.page.less'],
    standalone: true,
    imports: [
        TuiInputModule,
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
        TuiErrorModule,
        TuiSvgModule,
        TuiFieldErrorPipeModule,
        TuiInputPasswordModule,
        CommonModule,
        TuiButtonModule
    ],
    providers: [
        tuiInputPasswordOptionsProvider({
            icons: {
                hide: 'tuiIconLockLarge',
                show: 'tuiIconUnlockLarge'
            }
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
export class SignUpPage {
    protected signUpForm: FormGroup<{
        email: FormControl<string | null>,
        password: FormControl<string | null>
    }> = new FormGroup({
        email: new FormControl(
            'test987@gmail.com',
            [Validators.required, Validators.email]
        ),
        password: new FormControl(
            '12345678',
            [Validators.required, Validators.minLength(6)]
        )
    });

    constructor(
        private readonly authService: AuthenticationService
    ) {
    }

    protected async onSignUp(): Promise<void> {
        await this.authService.signUp({
            email: this.signUpForm.value.email as string,
            password: this.signUpForm.value.password as string
        });
        this.signUpForm.reset();
    }
}
