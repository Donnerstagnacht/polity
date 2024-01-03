import {Component} from '@angular/core';
import {
    TUI_VALIDATION_ERRORS,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiIslandModule
} from "@taiga-ui/kit";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {AsyncPipe} from "@angular/common";
import {TuiButtonModule, TuiErrorModule, TuiSvgModule, TuiTextfieldControllerModule} from "@taiga-ui/core";

@Component({
    selector: 'polity-update-email',
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
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: 'Bitte ausfüllen.',
                email: 'Bitte eine gültige E-Mail-Adresse eingeben.'
            }
        }
    ],
    templateUrl: './update-email.component.html',
    styleUrl: './update-email.component.less'
})
export class UpdateEmailComponent {
    protected updateEmailForm: FormGroup<{
        email: FormControl<string | null>,
    }> = new FormGroup({
        email: new FormControl(
            '',
            [Validators.required, Validators.email])
    })

    constructor(
        private readonly authService: AuthenticationService,
    ) {
    }

    protected async onUpdateEmail(): Promise<void> {
        await this.authService.updateEmail(
            this.updateEmailForm.value.email as string
        );
        this.updateEmailForm.reset();
    }

}
