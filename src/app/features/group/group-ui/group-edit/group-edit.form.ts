import {Component, effect, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiButtonModule, TuiErrorModule, TuiSvgModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit';
import {SupabaseObjectReturn} from '../../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {LoadingState} from '@polity-signal-store/types/loadingState.type';

@Component({
    selector: 'polity-group-edit-form',
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
    templateUrl: './group-edit.form.html',
    styleUrl: './group-edit.form.less'
})
export class GroupEditForm {
    public group: InputSignal<SupabaseObjectReturn<'groups_update'>> = input.required();
    public loadingState: InputSignal<LoadingState> = input.required();
    public newGroupData: OutputEmitterRef<SupabaseObjectReturn<'groups_update'>> = output();

    protected editGroupForm: FormGroup<{
        name: FormControl<string | null>,
        description: FormControl<string | null>
    }> = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)
    });

    constructor() {
        effect((): void => {
            this.editGroupForm.patchValue({
                name: this.group().name_,
                description: this.group().description_
            });
        });
    }

    protected async onEdit(): Promise<void> {
        const group: SupabaseObjectReturn<'groups_update'> =
            {
                name_: this.editGroupForm.value.name,
                description_: this.editGroupForm.value.description
            } as SupabaseObjectReturn<'groups_update'>;
        console.log(group);
        this.newGroupData.emit(group);
    }
}
