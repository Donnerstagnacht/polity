import {Component, signal, WritableSignal} from '@angular/core';
import {GroupRequestsOfUserStoreService} from "../action-store-services/group-requests-of-user.store.service";
import {GroupInvitationsOfUserStoreService} from "../action-store-services/group-invitations-of-user.store.service";
import {GroupsOfUserStoreService} from "../action-store-services/groups-of-user.store.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GroupsOfUserActionService} from "../action-store-services/groups-of-user.action.service";
import {GroupInvitationsOfUserActionService} from "../action-store-services/group-invitations-of-user.action.service";
import {GroupRequestsOfUserActionService} from "../action-store-services/group-requests-of-user.action.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {GroupMemberActionService} from "../../group_member/action-store-services/group-member.action.service";
import {FilterClearComponent} from "../../../ui/polity-filter/filter-clear/filter-clear.component";
import {FilterHeadlineComponent} from "../../../ui/polity-filter/filter-headline/filter-headline.component";
import {FilterStringComponent} from "../../../ui/polity-filter/filter-string/filter-string.component";
import {
    TableThreeIconTextDeleteComponent
} from "../../../ui/polity-table/table-three-icon-text-delete/table-three-icon-text-delete.component";
import {TuiTabsModule} from "@taiga-ui/kit";
import {
    TableThreeIconTextTwoActionsComponent
} from "../../../ui/polity-table/table-three-icon-text-two-actions/table-three-icon-text-two-actions.component";

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
    templateUrl: './profile-groups-edit.component.html',
    styleUrl: './profile-groups-edit.component.less'
})
export class ProfileGroupsEditComponent {
    protected isGroupMembershipsLoading: WritableSignal<boolean> = signal(true);
    protected groupMembershipsOfUser: WritableSignal<SupabaseObjectReturn<'read_groups_of_user'>[]> = signal([]);

    protected isGroupRequestsLoading: WritableSignal<boolean> = signal(true);
    protected groupRequestsOfUser: WritableSignal<SupabaseObjectReturn<'read_group_requests_of_user'>[]> = signal([]);

    protected isGroupInvitationsLoading: WritableSignal<boolean> = signal(true);
    protected groupInvitationsOfUser: WritableSignal<SupabaseObjectReturn<'read_group_member_invitations_of_user'>[]> = signal([]);

    protected combinedForm: FormGroup;
    protected showFilter: boolean = true;
    protected activeItemIndex: number = 0;
    protected showGroupMemberships: boolean = true;
    protected showGroupRequests: boolean = false;
    protected showGroupInvitations: boolean = false;

    constructor(
        private readonly groupsOfUserStoreService: GroupsOfUserStoreService,
        private readonly groupsOfUserActionService: GroupsOfUserActionService,
        private readonly groupMemberActionService: GroupMemberActionService,
        private readonly groupRequestsOfUserStoreService: GroupRequestsOfUserStoreService,
        private readonly groupRequestsOfUserActionService: GroupRequestsOfUserActionService,
        private readonly groupInvitationsOfUserStoreService: GroupInvitationsOfUserStoreService,
        private readonly groupInvitationsOfUserActionService: GroupInvitationsOfUserActionService,
        private readonly formBuilder: FormBuilder
    ) {
        this.isGroupMembershipsLoading = this.groupsOfUserStoreService.groupsOfUser.loading.getLoading();
        this.isGroupRequestsLoading = this.groupRequestsOfUserStoreService.groupRequestsOfUser.loading.getLoading();
        this.isGroupInvitationsLoading = this.groupInvitationsOfUserStoreService.groupInvitationsOfUser.loading.getLoading();

        this.combinedForm = this.formBuilder.group({
            filterStringForm: this.formBuilder.group({
                searchString: [],
            })
        })
        this.combinedForm.valueChanges.subscribe(
            () => this.onCombinedFormChange()
        )
    }

    async ngOnInit(): Promise<void> {
        await                 this.groupsOfUserActionService.readGroupsOfUser();
        this.groupMembershipsOfUser = this.groupsOfUserStoreService.groupsOfUser.getObjects();
        this.groupRequestsOfUser = this.groupRequestsOfUserStoreService.groupRequestsOfUser.getObjects();
        this.groupInvitationsOfUser = this.groupInvitationsOfUserStoreService.groupInvitationsOfUser.getObjects();
    }

    onCombinedFormChange(): void {
        const stringFilter = this.combinedForm.get('filterStringForm')?.value.searchString;
        let filterByString: boolean = false;

        if (stringFilter) {
            filterByString = true;
        }

        if (this.showGroupMemberships) {
            this.groupsOfUserStoreService.groupsOfUser.filterArray(
                filterByString,
                ['group_name', 'group_level'],
                stringFilter,
            )
        } else {
            this.groupRequestsOfUserStoreService.groupRequestsOfUser.filterArray(
                filterByString,
                ['group_name', 'group_level'],
                stringFilter
            )
        }
    }

    protected showGroupMembershipList(): void {
        this.groupsOfUserActionService.readGroupsOfUser();
        this.showGroupInvitations = false;
        this.showGroupRequests = false;
        this.showGroupMemberships = true;
    }

    protected showGroupRequestList(): void {
        this.groupRequestsOfUserActionService.readGroupRequestsOfUser()
        this.showGroupInvitations = false;
        this.showGroupMemberships = false;
        this.showGroupRequests = true;
    }

    protected showGroupInvitationList(): void {
        this.groupInvitationsOfUserActionService.readGroupInvitationsOfUser()
        this.showGroupMemberships = false;
        this.showGroupRequests = false;
        this.showGroupInvitations = true;
    }

    protected async leaveGroup(membership_id: string): Promise<void> {
        await this.groupMemberActionService.removeGroupMember(membership_id);
    }

    protected async withdrawGroupRequest(requestId: string): Promise<void> {
        await this.groupMemberActionService.withDrawGroupRequestById(requestId);
    }

    protected async acceptGroupInvitation(membership_id: string): Promise<void> {
        await this.groupMemberActionService.accceptGroupInvitationById(membership_id);
        await console.log('accept group invitation', membership_id)
    }

    protected async declineGroupInvitation(membership_id: string): Promise<void> {
        await this.groupMemberActionService.removeGroupInvitation(membership_id);
        await console.log('decline group invitation', membership_id)
    }

    protected clearFilter(): void {
        this.combinedForm.reset()
        if (this.showGroupMemberships) {
            this.groupsOfUserStoreService.groupsOfUser.resetDisplayedObjects();
        } else {
            this.groupRequestsOfUserStoreService.groupRequestsOfUser.resetDisplayedObjects();
        }
    }

    protected toggleShowFilter(): void {
        this.showFilter = !this.showFilter
        this.clearFilter()
    }

}
