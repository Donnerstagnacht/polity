import {Component, signal, WritableSignal} from '@angular/core';
import {StepperRightComponent} from "../../../navigation/stepper-right/stepper-right.component";
import {StepperTopComponent} from "../../../navigation/stepper-top/stepper-top.component";
import {SecondBarTopComponent} from "../../../navigation/second-bar-top/second-bar-top.component";
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
} from "@taiga-ui/kit";
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiErrorModule,
    TuiGroupModule,
    TuiHintModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {AsyncPipe} from "@angular/common";
import {NgxPageScrollModule} from "ngx-page-scroll";
import {AutoscrollDirective} from "../../../navigation/autoscroll.directive";
import {StepperItem} from "../../../navigation/types-and-interfaces/stepper-item";
import {CreateGroupService} from "../../new/action-store-services/create-group.service";
import {SearchUserActionService} from "../../search/action-store-services/search-user.action.service";
import {
    SupabaseArrayReturn,
    SupabaseEnum,
    SupabaseObjectReturn
} from "../../../../../supabase/types/supabase.shorthand-types";
import {SearchUserStoreService} from "../../search/action-store-services/search-user.store.service";
import {
    TableThreeIconTextDeleteComponent
} from "../../../ui/polity-table/table-three-icon-text-delete/table-three-icon-text-delete.component";
import {CREATE_GROUP_STEPPER_ITEMS} from "../../../navigation/create-groupe-stepper";
import {GroupNew} from "../../new/types/group-new";

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
        TuiSelectModule
    ],
    templateUrl: './group-new.component.html',
    styleUrl: './group-new.component.less'
})
export class GroupNewComponent {
    value = [];
    selectedUsers: SupabaseArrayReturn<'search_user'> = []
    selectedUsersAsSignal: WritableSignal<SupabaseArrayReturn<'search_user'>> = signal([])
    protected createGroupForm: FormGroup<{
        name: FormControl<string | null>,
        level: FormControl<string | null>
        description: FormControl<string | null>,
        members: FormControl<string | null>
    }> = new FormGroup({
        name: new FormControl('', Validators.required),
        level: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        members: new FormControl('')
    })
    protected menuItems: StepperItem[] = CREATE_GROUP_STEPPER_ITEMS;
    protected searchResults: WritableSignal<SupabaseArrayReturn<'search_user'>> = signal([]);
    protected readonly signal = signal;

    constructor(
        private createGroupService: CreateGroupService,
        private searchUserActionService: SearchUserActionService,
        private searchStoreService: SearchUserStoreService
    ) {
        this.searchResults = this.searchStoreService.profilSearchResults.getObjects();
    }

    ngOnInit(): void {
        this.createGroupForm.valueChanges.subscribe((value): void => {
            this.updateMenuItemIcon('name', 0);
            this.updateMenuItemIcon('level', 1);
            this.updateMenuItemIcon('description', 2);
            this.updateMenuItemIcon('members', 3);
            this.updateMenuItemIcon('Inaugural-Meeting', 4);
        })

        this.createGroupForm.controls['members'].valueChanges.subscribe((value: any): void => {
            if (value) {
                const choosenObject: SupabaseObjectReturn<'search_user'> | undefined = this.searchResults().find((searchResult: SupabaseObjectReturn<'search_user'>): boolean => {
                    return value.id === searchResult.id
                })

                if (choosenObject && !this.selectedUsers.some((item: SupabaseObjectReturn<'search_user'>): boolean => item.id === choosenObject.id)) {
                    this.selectedUsers.push(choosenObject);
                    this.selectedUsersAsSignal.update((selectedUser: SupabaseArrayReturn<'search_user'>) => ([...selectedUser, choosenObject]))
                    this.createGroupForm.controls['members'].setValue(null);
                } else {
                    this.createGroupForm.controls['members'].setValue(null);
                }
            }
        })
    }

    protected onSearchChange(search: string | null): void {
        if (search) {
            this.searchUserActionService.searchUser(search);
        }
    }

    protected onRemove(id: string): void {
        this.selectedUsers = this.selectedUsers.filter((item: SupabaseObjectReturn<'search_user'>): boolean => item.id !== id);
        this.selectedUsersAsSignal.set(this.selectedUsers);
    }

    protected stringify(searchResult: { first_name: string; last_name: string }): string {
        if (searchResult.first_name && searchResult.last_name) {
            return `${searchResult.first_name} ${searchResult.last_name}`
        } else {
            return ''
        }
    }

    protected async onCreateGroup(): Promise<void> {
        const newGroup: GroupNew = {
            name: this.createGroupForm.value.name as string,
            level: this.createGroupForm.value.level as SupabaseEnum<'group_level'>,
            description: this.createGroupForm.value.description as string,
            invited_members: this.selectedUsers.map((item: SupabaseObjectReturn<'search_user'>): string => item.id)
        }
        await this.createGroupService.createGroup(newGroup);
        this.createGroupForm.reset()
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
