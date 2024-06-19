import {Component} from '@angular/core';
import {
    TUI_PASSWORD_TEXTS,
    TUI_VALIDATION_ERRORS,
    TuiFieldErrorPipeModule,
    TuiInputPasswordModule,
    tuiInputPasswordOptionsProvider,
    TuiIslandModule
} from '@taiga-ui/kit';
import {of} from 'rxjs';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {TuiButtonModule, TuiErrorModule, TuiSvgModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {AuthenticationService} from '../store/authentication.service';

@Component({
    selector: 'polity-reset-password',
    standalone: true,
    imports: [
        TuiIslandModule,
        AsyncPipe,
        ReactiveFormsModule,
        TuiButtonModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiInputPasswordModule,
        TuiSvgModule,
        TuiTextfieldControllerModule
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
                minlength: ({requiredLength}: {
                    requiredLength: string
                }) =>
                    of(`Passwort benötigt mindestens ${requiredLength} Zeichen.`)
            }
        }
    ],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.less'
})
export class ResetPasswordComponent {
    protected updatePasswordForm: FormGroup<{
        password: FormControl<string | null>
    }> = new FormGroup({
        password: new FormControl(
            '',
            [Validators.required, Validators.minLength(6)]
        )
    });

    constructor(
        private readonly authService: AuthenticationService
    ) {
    }

    protected async onUpdatePassword(): Promise<void> {
        await this.authService.updatePassword(
            this.updatePasswordForm.value.password as string
        );
        this.updatePasswordForm.reset();
    }

}
