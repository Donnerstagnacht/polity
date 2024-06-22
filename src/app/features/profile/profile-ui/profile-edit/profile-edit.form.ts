import {Component, effect, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiButtonModule, TuiErrorModule, TuiSvgModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit';
import {SupabaseObjectReturn} from '../../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {LoadingState} from '@polity-signal-store/types/loadingState.type';

@Component({
    selector: 'polity-profile-edit-form',
    standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        ReactiveFormsModule,
        TuiButtonModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiInputModule,
        TuiSvgModule,
        TuiTextfieldControllerModule
    ],
    templateUrl: './profile-edit.form.html',
    styleUrl: './profile-edit.form.less'
})
export class ProfileEditForm {
    public profile: InputSignal<SupabaseObjectReturn<'profiles_read'>> = input.required();
    public loadingState: InputSignal<LoadingState> = input.required();
    public newProfileData: OutputEmitterRef<SupabaseObjectReturn<'profiles_read'>> = output();

    protected editProfileForm: FormGroup<{
        firstName: FormControl<string | null>,
        lastName: FormControl<string | null>
    }> = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required)
    });

    constructor() {
        effect((): void => {
            this.editProfileForm.patchValue({
                firstName: this.profile().first_name_,
                lastName: this.profile().last_name_
            });
        });
    }

    protected async onEdit(): Promise<void> {
        const profile: SupabaseObjectReturn<'profiles_read'> =
            {
                first_name_: this.editProfileForm.value.firstName,
                last_name_: this.editProfileForm.value.lastName
            } as SupabaseObjectReturn<'profiles_read'>;
        this.newProfileData.emit(profile);
    }
}
