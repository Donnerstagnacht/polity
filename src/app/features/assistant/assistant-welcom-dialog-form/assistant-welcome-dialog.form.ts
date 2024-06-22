import {Component, output, OutputEmitterRef} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {TuiButtonModule, TuiErrorModule, TuiSvgModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit';
import {AsyncPipe} from '@angular/common';

@Component({
    selector: 'polity-assistant-welcome-dialog-form',
    standalone: true,
    imports: [
        TuiTextfieldControllerModule,
        TuiInputModule,
        ReactiveFormsModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiButtonModule,
        AsyncPipe,
        TuiSvgModule
    ],
    templateUrl: './assistant-welcome-dialog.form.html',
    styleUrl: './assistant-welcome-dialog.form.less'
})
export class AssistantWelcomeDialogForm {
    public step1CloseTutorialEmitter: OutputEmitterRef<SupabaseObjectReturn<'profiles_read'>> = output();
    public step1NavigateToProfileStepEmitter: OutputEmitterRef<{
        profile: SupabaseObjectReturn<'profiles_read'>,
        step: number
    }> = output();

    protected welcomeForm: FormGroup<{
        firstName: FormControl<string | null>,
        lastName: FormControl<string | null>,
    }> = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required)
    });

    protected async step1CloseTutorial(): Promise<void> {
        const updateData: SupabaseObjectReturn<'profiles_read'> = this.updateProfileName();
        this.step1CloseTutorialEmitter.emit(updateData);
    }

    protected async step1NavigateToProfileStep(delta: number): Promise<void> {
        const updateData: SupabaseObjectReturn<'profiles_read'> = this.updateProfileName();
        this.step1NavigateToProfileStepEmitter.emit({
            profile: updateData,
            step: delta
        });
    }

    private updateProfileName(): SupabaseObjectReturn<'profiles_read'> {
        return {
            first_name_: this.welcomeForm.value.firstName,
            last_name_: this.welcomeForm.value.lastName
        } as SupabaseObjectReturn<'profiles_read'>;
    }
}
