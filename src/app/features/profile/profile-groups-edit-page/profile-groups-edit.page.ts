import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    TableThreeIconTextDeleteComponent
} from '@polity-ui/polity-table/table-three-icon-text-delete/table-three-icon-text-delete.component';
import {TuiTabsModule} from '@taiga-ui/kit';
import {
    TableThreeIconTextTwoActionsComponent
} from '@polity-ui/polity-table/table-three-icon-text-two-actions/table-three-icon-text-two-actions.component';
import {FilterHeadlineComponent} from '@polity-ui/polity-filter/filter-headline/filter-headline.component';
import {FilterClearComponent} from '@polity-ui/polity-filter/filter-clear/filter-clear.component';
import {FilterStringComponent} from '@polity-ui/polity-filter/filter-string/filter-string.component';
import {InvitationsOfUserStore} from '@polity-profile/profile-groups-state/invitations-of-user.store';
import {RequestsOfUserStore} from '@polity-profile/profile-groups-state/requests-of-user.store';
import {MembershipsOfUserStore} from '@polity-profile/profile-groups-state/memberships-of-user.store';

@Component({
    selector: 'polity-profile-groups-edit',
    standalone: true,
    imports: [
        FilterClearComponent,
        FilterHeadlineComponent,
        FilterStringComponent,
        FormsModule,
        ReactiveFormsModule,
        TableThreeIconTextDeleteComponent,
        TuiTabsModule,
        TableThreeIconTextTwoActionsComponent
    ],
    templateUrl: './profile-groups-edit.page.html',
    styleUrl: './profile-groups-edit.page.less',
    providers: [
        InvitationsOfUserStore,
        RequestsOfUserStore,
        MembershipsOfUserStore
    ]
})
export class ProfileGroupsEditPage {
    protected invitationsOfUserStore: InvitationsOfUserStore = inject(InvitationsOfUserStore);
    protected requestsOfUserStore: RequestsOfUserStore = inject(RequestsOfUserStore);
    protected membershipsOfUserStore: MembershipsOfUserStore = inject(MembershipsOfUserStore);

    protected combinedForm: FormGroup;
    protected showFilter: boolean = true;
    protected activeItemIndex: number = 0;
    protected showGroupMemberships: boolean = true;
    protected showGroupRequests: boolean = false;
    protected showGroupInvitations: boolean = false;
    protected readonly signal = signal;

    constructor(private readonly formBuilder: FormBuilder) {
        this.combinedForm = this.formBuilder.group({
            filterStringForm: this.formBuilder.group({
                searchString: []
            })
        });
        this.combinedForm.valueChanges.subscribe(
            () => this.onCombinedFormChange()
        );
    }

    async ngOnInit(): Promise<void> {
        await this.membershipsOfUserStore.read();
    }

    onCombinedFormChange(): void {
        const stringFilter = this.combinedForm.get('filterStringForm')?.value.searchString;
        let filterByString: boolean = false;

        if (stringFilter) {
            filterByString = true;
        }

        if (this.showGroupMemberships) {
            this.membershipsOfUserStore.setFilterState({
                filterByStringState: {
                    filterByString: filterByString,
                    stringSearchKeys: ['group_name_', 'group_level_'],
                    searchString: stringFilter
                }
            });
        } else if (this.showGroupInvitations) {
            this.invitationsOfUserStore.setFilterState({
                filterByStringState: {
                    filterByString: filterByString,
                    stringSearchKeys: ['group_name_', 'group_level_'],
                    searchString: stringFilter
                }
            });
        } else {
            this.requestsOfUserStore.setFilterState({
                filterByStringState: {
                    filterByString: filterByString,
                    stringSearchKeys: ['group_name_', 'group_level_'],
                    searchString: stringFilter
                }
            });
        }
    }

    protected showGroupMembershipList(): void {
        this.membershipsOfUserStore.read();
        this.showGroupInvitations = false;
        this.showGroupRequests = false;
        this.showGroupMemberships = true;
    }

    protected showGroupRequestList(): void {
        this.requestsOfUserStore.read();
        this.showGroupInvitations = false;
        this.showGroupMemberships = false;
        this.showGroupRequests = true;
    }

    protected showGroupInvitationList(): void {
        this.invitationsOfUserStore.read();
        this.showGroupMemberships = false;
        this.showGroupRequests = false;
        this.showGroupInvitations = true;
    }

    protected async leaveGroup(membership_id: string): Promise<void> {
        await this.membershipsOfUserStore.remove(membership_id);
    }

    protected async withdrawGroupRequest(requestId: string): Promise<void> {
        await this.requestsOfUserStore.deleteById(requestId);
    }

    protected async acceptGroupInvitation(membership_id: string): Promise<void> {
        await this.invitationsOfUserStore.acceptById(membership_id);
    }

    protected async removeGroupInvitation(membership_id: string): Promise<void> {
        await this.invitationsOfUserStore.remove(membership_id);
    }

    protected clearFilter(): void {
        this.combinedForm.reset();
        if (this.showGroupMemberships) {
            this.membershipsOfUserStore.resetFilterState();
        } else if (this.showGroupInvitations) {
            this.invitationsOfUserStore.resetFilterState();
        } else {
            this.requestsOfUserStore.resetFilterState();
        }
    }

    protected toggleShowFilter(): void {
        this.showFilter = !this.showFilter;
        this.clearFilter();
    }
}
