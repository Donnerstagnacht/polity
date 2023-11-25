import {Component} from '@angular/core';
import {
    TUI_PASSWORD_TEXTS,
    TUI_VALIDATION_ERRORS,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiInputPasswordModule,
    tuiInputPasswordOptionsProvider
} from "@taiga-ui/kit";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {TuiButtonModule, TuiErrorModule, TuiSvgModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {CommonModule} from "@angular/common";
import {of} from "rxjs";

@Component({
    selector: 'polity-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.less'],
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
        private readonly authService: AuthenticationService
    ) {
    }

    protected async onSignUp(): Promise<void> {
        await this.authService.signUp({
            email: this.signUpForm.value.email as string,
            password: this.signUpForm.value.password as string
        })
        this.signUpForm.reset();
    }
}
