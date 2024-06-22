import {Component, output, OutputEmitterRef} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SearchProfilesBarComponent} from '@polity-search/search-ui/search-profiles-bar/search-profiles-bar.component';
import {
    TuiButtonModule,
    TuiErrorModule,
    TuiGroupModule,
    TuiHintModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {TuiFieldErrorPipeModule, TuiInputModule, TuiRadioBlockModule} from '@taiga-ui/kit';
import {GroupNew} from '../../types/group-new';
import {DatabaseHiddenOverwritten} from '../../../../../../supabase/types/supabase.hidden.modified';
import {SupabaseObjectReturn} from '../../../../../../supabase/types/supabase.authenticated.shorthand-types';

@Component({
    selector: 'polity-new-group-form',
    standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        ReactiveFormsModule,
        SearchProfilesBarComponent,
        TuiButtonModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiGroupModule,
        TuiHintModule,
        TuiInputModule,
        TuiRadioBlockModule,
        TuiSvgModule,
        TuiTextfieldControllerModule
    ],
    templateUrl: './new-group.form.html',
    styleUrl: './new-group.form.less'
})
export class NewGroupForm {
    public newGroup: OutputEmitterRef<GroupNew> = output<GroupNew>();
    protected selectedUsers: SupabaseObjectReturn<'search_user'>[] = [];
    protected createGroupForm: FormGroup<{
        name: FormControl<string | null>,
        level: FormControl<string | null>
        description: FormControl<string | null>,
    }> = new FormGroup({
        name: new FormControl('', Validators.required),
        level: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)
    });

    protected onCreateGroup(): void {
        const newGroup: GroupNew = {
            name: this.createGroupForm.value.name as string,
            level: this.createGroupForm.value.level as DatabaseHiddenOverwritten['hidden']['Enums']['group_level'],
            description: this.createGroupForm.value.description as string,
            invited_members: this.selectedUsers.map(
                (item: SupabaseObjectReturn<'search_user'>): string => item.id_)
        };
        this.newGroup.emit(newGroup);
        this.createGroupForm.reset();
    }

    protected onInviteUser(selectedUsers: SupabaseObjectReturn<'search_user'>[]): void {
        this.selectedUsers = selectedUsers;
    }

    protected onCancelUserInvite(cancelUser: SupabaseObjectReturn<'search_user'>): void {
        const index: number = this.selectedUsers.findIndex(
            (item: SupabaseObjectReturn<'search_user'>): boolean => item.id_ === cancelUser.id_
        );
        if (index !== -1) {
            this.selectedUsers.splice(index, 1);
        }
    }
}
