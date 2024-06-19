import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
    TUI_PASSWORD_TEXTS,
    TUI_VALIDATION_ERRORS,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiInputPasswordModule,
    tuiInputPasswordOptionsProvider
} from '@taiga-ui/kit';
import {of} from 'rxjs';
import {TuiButtonModule, TuiErrorModule, TuiSvgModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {AuthenticationService} from '../state/authentication.service';

@Component({
    selector: 'polity-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.less'],
    standalone: true,
    imports: [
        TuiErrorModule,
        TuiButtonModule,
        TuiInputPasswordModule,
        TuiFieldErrorPipeModule,
        TuiSvgModule,
        TuiTextfieldControllerModule,
        ReactiveFormsModule,
        TuiInputModule,
        CommonModule,
        RouterLink
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
export class SignInComponent {
    protected signInForm: FormGroup<{
        email: FormControl<string | null>,
        password: FormControl<string | null>
    }> = new FormGroup({
        email: new FormControl(
            'user1@gmail.com',
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

    protected async onSignIn(): Promise<void> {
        await this.authService.signIn({
            email: this.signInForm.value.email as string,
            password: this.signInForm.value.password as string
        });
        this.signInForm.reset();
    }
}
