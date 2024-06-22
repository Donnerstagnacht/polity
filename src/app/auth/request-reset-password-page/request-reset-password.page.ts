import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {TuiButtonModule, TuiErrorModule, TuiSvgModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TUI_VALIDATION_ERRORS, TuiFieldErrorPipeModule, TuiInputModule, TuiIslandModule} from '@taiga-ui/kit';
import {AuthenticationService} from '../state/authentication.service';

@Component({
    selector: 'polity-request-reset-password',
    standalone: true,
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        TuiButtonModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiInputModule,
        TuiIslandModule,
        TuiSvgModule,
        TuiTextfieldControllerModule
    ],
    providers: [
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: 'Bitte ausfüllen.',
                email: 'Bitte eine gültige E-Mail-Adresse eingeben.'
            }
        }
    ],
    templateUrl: './request-reset-password.page.html',
    styleUrl: './request-reset-password.page.less'
})
export class RequestResetPasswordPage {
    protected requestPasswordResetForm: FormGroup<{
        email: FormControl<string | null>,
    }> = new FormGroup({
        email: new FormControl(
            '',
            [Validators.required, Validators.email]
        )
    });

    constructor(
        private readonly authService: AuthenticationService
    ) {
    }

    protected async onRequestPasswordReset(): Promise<void> {
        await this.authService.requestPasswordReset(
            this.requestPasswordResetForm.value.email as string
        );
        this.requestPasswordResetForm.reset();
    }
}
