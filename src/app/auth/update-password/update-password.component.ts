import {Component} from '@angular/core';
import {
    TUI_PASSWORD_TEXTS,
    TUI_VALIDATION_ERRORS,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiInputPasswordModule,
    tuiInputPasswordOptionsProvider,
    TuiIslandModule
} from "@taiga-ui/kit";
import {of} from "rxjs";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {AsyncPipe} from "@angular/common";
import {TuiButtonModule, TuiErrorModule, TuiSvgModule, TuiTextfieldControllerModule} from "@taiga-ui/core";

@Component({
    selector: 'polity-update-password',
    standalone: true,
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        TuiButtonModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiInputModule,
        TuiInputPasswordModule,
        TuiIslandModule,
        TuiSvgModule,
        TuiTextfieldControllerModule
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
    ],
    templateUrl: './update-password.component.html',
    styleUrl: './update-password.component.less'
})
export class UpdatePasswordComponent {
    protected updatePasswordForm: FormGroup<{
        password: FormControl<string | null>
    }> = new FormGroup({
        password: new FormControl(
            '12345678',
            [Validators.required, Validators.minLength(6)]),
    })

    constructor(
        private readonly authService: AuthenticationService,
    ) {
    }

    protected async onUpdatePassword(): Promise<void> {
        await this.authService.updatePassword(
            this.updatePasswordForm.value.password as string
        );
        this.updatePasswordForm.reset();
    }
}
