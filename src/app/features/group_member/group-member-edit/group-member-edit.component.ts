import {Component, signal, WritableSignal} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
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
import {GroupRequestsActionService} from "../action-store-services/group-requests.action.service";
import {GroupInvitationsStoreService} from "../action-store-services/group-invitations.store.service";
import {GroupInvitationsActionService} from "../action-store-services/group-invitations.action.service";
import {GroupRequestsStoreService} from "../action-store-services/group-requests.store.service";
import {
    TableThreeIconTextTwoActionsComponent
} from "../../../ui/polity-table/table-three-icon-text-two-actions/table-three-icon-text-two-actions.component";
import {SearchProfilesBarComponent} from "../../search/search-profiles-bar/search-profiles-bar.component";

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
        TuiTabsModule,
        TableThreeIconTextTwoActionsComponent,
        SearchProfilesBarComponent
    ],
    templateUrl: './group-member-edit.component.html',
    styleUrl: './group-member-edit.component.less'
})
export class GroupMemberEditComponent {
    protected members: WritableSignal<SupabaseObjectReturn<'read_group_members'>[]> = signal([]);
    protected isMembersLoading: WritableSignal<boolean> = signal(true);

    protected isRequestsLoading: WritableSignal<boolean> = signal(true);
    protected requests: WritableSignal<SupabaseObjectReturn<'read_group_member_requests'>[]> = signal([]);

    protected isInvitationsLoading: WritableSignal<boolean> = signal(true);
    protected invitations: WritableSignal<SupabaseObjectReturn<'read_group_member_invitations'>[]> = signal([]);


    protected readonly columns: string[] = ['first_name', 'last_name', 'actions'];


    protected combinedForm: FormGroup;
    protected activeItemIndex: number = 0;
    protected showFilter: boolean = true;
    protected showMembers: boolean = true;
    protected showRequests: boolean = false;
    protected showInvitations: boolean = false;

    constructor(
        private readonly groupMemberStoreService: GroupMemberStoreService,
        private readonly groupMemberActionService: GroupMemberActionService,
        private readonly groupRequestsStoreService: GroupRequestsStoreService,
        private readonly groupRequestsActionService: GroupRequestsActionService,
        private readonly groupInvitationsStoreService: GroupInvitationsStoreService,
        private readonly groupInvitationsActionService: GroupInvitationsActionService,
        private readonly formBuilder: FormBuilder
    ) {
        this.isMembersLoading = this.groupMemberStoreService.groupMembers.loading.getLoading();
        this.isInvitationsLoading = this.groupInvitationsStoreService.groupInvitations.loading.getLoading();
        this.isRequestsLoading = this.groupRequestsStoreService.groupRequests.loading.getLoading();

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
        this.members = this.groupMemberStoreService.groupMembers.getObjects();
        this.requests = this.groupRequestsStoreService.groupRequests.getObjects();
        this.invitations = this.groupInvitationsStoreService.groupInvitations.getObjects();
    }

    protected onCombinedFormChange(): void {
        const stringFilter = this.combinedForm.get('filterStringForm')?.value.searchString;
        let filterByString: boolean = false;

        if (stringFilter) {
            filterByString = true;
        }

        if (this.showMembers) {
            this.groupMemberStoreService.groupMembers.filterArray(
                filterByString,
                ['first_name', 'last_name'],
                stringFilter
            )
        }
    }

    protected async removeGroupMember(id: string): Promise<void> {
        await this.groupMemberActionService.removeGroupMember(id, true);
    }

    protected clearFilter(): void {
        this.combinedForm.reset()
        if (this.showMembers) {
            this.groupMemberStoreService.groupMembers.resetDisplayedObjects();
        }
    }

    protected toggleShowFilter(): void {
        this.showFilter = !this.showFilter
        this.clearFilter()
    }

    protected showGroupMemberList(): void {
        this.groupMemberActionService.readGroupMembers();
        this.showInvitations = false;
        this.showRequests = false;
        this.showMembers = true;
    }

    protected showGroupRequestList(): void {
        this.groupRequestsActionService.readGroupRequests()
        this.showInvitations = false;
        this.showMembers = false;
        this.showRequests = true;
    }

    protected showGroupInvitationList(): void {
        this.groupInvitationsActionService.readGroupInvitations()
        this.showMembers = false;
        this.showRequests = false;
        this.showInvitations = true;
    }

    protected async withdrawInvitation(invitationId: string): Promise<void> {
        await this.groupMemberActionService.removeGroupInvitation(invitationId, true);
    }

    protected async acceptMembershipRequest(requestId: string): Promise<void> {
        await this.groupMemberActionService.acceptGroupMembershipRequest(requestId);
        await console.log('accept request', requestId)
    }

    protected async declineMembershipRequest(requestId: string): Promise<void> {
        await this.groupMemberActionService.declineGroupMembershipRequest(requestId, true);
        await console.log('decline request', requestId)
    }

    protected onSelectedUserUpdate(selectedUsers: SupabaseObjectReturn<'search_user'>[]): void {
        const addedUser: SupabaseObjectReturn<'search_user'> = selectedUsers[selectedUsers.length - 1];
        console.log('userId invite', addedUser.id)
        this.groupMemberActionService.inviteGroupMember(addedUser.id);
    }
}
