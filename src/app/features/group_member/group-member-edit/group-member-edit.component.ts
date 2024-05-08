import {Component, signal, WritableSignal} from '@angular/core';
import {SupabaseArrayReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GroupMemberStoreService} from "../action-store-services/group-member.store.service";
import {GroupMemberActionService} from "../action-store-services/group-member.action.service";
import {FilterClearComponent} from "../../../ui/polity-filter/filter-clear/filter-clear.component";
import {FilterHeadlineComponent} from "../../../ui/polity-filter/filter-headline/filter-headline.component";
import {FilterStringComponent} from "../../../ui/polity-filter/filter-string/filter-string.component";
import {
    TableThreeIconTextDeleteComponent
} from "../../../ui/polity-table/table-three-icon-text-delete/table-three-icon-text-delete.component";
import {TuiTabsModule} from "@taiga-ui/kit";

@Component({
    selector: 'polity-group-member-edit',
    standalone: true,
    imports: [
        FilterClearComponent,
        FilterHeadlineComponent,
        FilterStringComponent,
        FormsModule,
        ReactiveFormsModule,
        TableThreeIconTextDeleteComponent,
        TuiTabsModule
    ],
    templateUrl: './group-member-edit.component.html',
    styleUrl: './group-member-edit.component.less'
})
export class GroupMemberEditComponent {
    protected groupMembers: WritableSignal<SupabaseArrayReturn<'read_group_members'>> = signal([]);
    protected isGroupMembersLoading: WritableSignal<boolean> = signal(true);
    protected readonly columns: string[] = ['first_name', 'last_name', 'actions'];
    protected activeItemIndex: number = 0;
    protected showGroupMembers: boolean = true;
    protected combinedForm: FormGroup;
    protected showFilter: boolean = true;

    constructor(
        private readonly groupMemberStoreService: GroupMemberStoreService,
        private readonly groupMemberActionService: GroupMemberActionService,
        private readonly formBuilder: FormBuilder
    ) {
        this.isGroupMembersLoading = this.groupMemberStoreService.groupMembers.loading.getLoading();
        this.combinedForm = this.formBuilder.group({
            filterStringForm: this.formBuilder.group({
                searchString: [],
            })
        })

        this.combinedForm.valueChanges.subscribe(
            () => this.onCombinedFormChange()
        );
    }

    async ngOnInit(): Promise<void> {
        await this.groupMemberActionService.readGroupMembers();
        this.groupMembers = this.groupMemberStoreService.groupMembers.getObjects();
    }

    protected onCombinedFormChange(): void {
        const stringFilter = this.combinedForm.get('filterStringForm')?.value.searchString;
        let filterByString: boolean = false;

        if (stringFilter) {
            filterByString = true;
        }

        if (this.showGroupMembers) {
            this.groupMemberStoreService.groupMembers.filterArray(
                filterByString,
                ['first_name', 'last_name'],
                stringFilter
            )
        }
    }

    protected async removeGroupMember(id: string): Promise<void> {
        await this.groupMemberActionService.removeGroupMember(id);
    }

    protected clearFilter(): void {
        this.combinedForm.reset()
        if (this.showGroupMembers) {
            this.groupMemberStoreService.groupMembers.resetDisplayedObjects();
        }
    }

    protected toggleShowFilter(): void {
        this.showFilter = !this.showFilter
        this.clearFilter()
    }

}
