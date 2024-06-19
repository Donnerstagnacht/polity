import {Component, inject, signal} from '@angular/core';
import {StepperRightComponent} from '../../../navigation/stepper-right/stepper-right.component';
import {StepperTopComponent} from '../../../navigation/stepper-top/stepper-top.component';
import {SecondBarTopComponent} from '../../../navigation/second-bar-top/second-bar-top.component';
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiFieldErrorPipeModule,
    TuiFilterByInputPipeModule,
    TuiInputModule,
    TuiInputTagModule,
    TuiRadioBlockModule,
    TuiSelectModule,
    TuiStringifyContentPipeModule
} from '@taiga-ui/kit';
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiErrorModule,
    TuiGroupModule,
    TuiHintModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {AsyncPipe} from '@angular/common';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {AutoscrollDirective} from '../../../navigation/autoscroll.directive';
import {StepperItem} from '../../../navigation/types-and-interfaces/stepper-item';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {
    TableThreeIconTextDeleteComponent
} from '../../../ui/polity-table/table-three-icon-text-delete/table-three-icon-text-delete.component';
import {CREATE_GROUP_STEPPER_ITEMS} from '../../../navigation/create-groupe-stepper';
import {GroupNew} from '../../new/types/group-new';
import {SearchProfilesBarComponent} from '../../search/search-profiles-bar/search-profiles-bar.component';
import {DatabaseHiddenOverwritten} from '../../../../../supabase/types/supabase.hidden.modified';
import {CreateGroupStore} from '../../new/state/create-group.store';

@Component({
    selector: 'polity-group-new',
    standalone: true,
    imports: [
        StepperRightComponent,
        StepperTopComponent,
        SecondBarTopComponent,
        FormsModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiHintModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiSvgModule,
        AsyncPipe,
        TuiButtonModule,
        NgxPageScrollModule,
        AutoscrollDirective,
        TuiSvgModule,
        TuiRadioBlockModule,
        TuiGroupModule,
        TuiInputTagModule,
        TuiDataListWrapperModule,
        TuiDataListModule,
        TuiStringifyContentPipeModule,
        TuiFilterByInputPipeModule,
        TuiComboBoxModule,
        TableThreeIconTextDeleteComponent,
        TuiSelectModule,
        SearchProfilesBarComponent
    ],
    templateUrl: './group-new.component.html',
    styleUrl: './group-new.component.less'
})
export class GroupNewComponent {
    selectedUsers: SupabaseObjectReturn<'search_user'>[] = [];
    protected createGroupStore: CreateGroupStore = inject(CreateGroupStore);
    protected createGroupForm: FormGroup<{
        name: FormControl<string | null>,
        level: FormControl<string | null>
        description: FormControl<string | null>,
    }> = new FormGroup({
        name: new FormControl('', Validators.required),
        level: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)
    });
    protected menuItems: StepperItem[] = CREATE_GROUP_STEPPER_ITEMS;
    protected readonly signal = signal;

    ngOnInit(): void {
        this.createGroupForm.valueChanges.subscribe((value): void => {
            this.updateMenuItemIcon('name', 0);
            this.updateMenuItemIcon('level', 1);
            this.updateMenuItemIcon('description', 2);
            this.updateMenuItemIcon('members', 3);
            this.updateMenuItemIcon('Inaugural-Meeting', 4);
        });
    }

    protected onSelectedUserUpdate(selectedUsers: SupabaseObjectReturn<'search_user'>[]): void {
        this.selectedUsers = selectedUsers;
    }

    protected async onCreateGroup(): Promise<void> {
        const newGroup: GroupNew = {
            name: this.createGroupForm.value.name as string,
            level: this.createGroupForm.value.level as DatabaseHiddenOverwritten['hidden']['Enums']['group_level'],
            description: this.createGroupForm.value.description as string,
            invited_members: this.selectedUsers.map((item: SupabaseObjectReturn<'search_user'>): string => item.id_)
        };
        await this.createGroupStore.create(newGroup);
        this.createGroupForm.reset();
    }

    private updateMenuItemIcon(controlName: string, index: number): void {
        const control: AbstractControl<any, any> | null = this.createGroupForm.get(controlName);

        if (control?.valid) {
            this.menuItems[index].icon = 'pass';
        } else {
            this.menuItems[index].icon = 'error';
        }
    }
}
