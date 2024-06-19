import {Component, inject, signal} from '@angular/core';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FilterClearComponent} from '../../../ui/polity-filter/filter-clear/filter-clear.component';
import {FilterHeadlineComponent} from '../../../ui/polity-filter/filter-headline/filter-headline.component';
import {FilterStringComponent} from '../../../ui/polity-filter/filter-string/filter-string.component';
import {
    TableThreeIconTextDeleteComponent
} from '../../../ui/polity-table/table-three-icon-text-delete/table-three-icon-text-delete.component';
import {TuiTabsModule} from '@taiga-ui/kit';
import {
    TableThreeIconTextTwoActionsComponent
} from '../../../ui/polity-table/table-three-icon-text-two-actions/table-three-icon-text-two-actions.component';
import {SearchProfilesBarComponent} from '../../search/search-profiles-bar/search-profiles-bar.component';
import {GroupRequestsStore} from '../store/group-requests.store';
import {GroupMembersStore} from '../store/group-members.store';
import {GroupInvitationsStore} from '../store/group-invitations.store';

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
    protected groupMemberStore: GroupMembersStore = inject(GroupMembersStore);
    protected groupRequestsStore: GroupRequestsStore = inject(GroupRequestsStore);
    protected groupInvitationsStore: GroupInvitationsStore = inject(GroupInvitationsStore);
    // protected members: WritableSignal<SupabaseObjectReturn<'read_group_members'>[]> = signal([]);
    // protected isMembersLoading: WritableSignal<boolean> = signal(true);

    // protected isRequestsLoading: WritableSignal<boolean> = signal(true);
    // protected requests: WritableSignal<SupabaseObjectReturn<'read_group_member_requests'>[]> = signal([]);

    // protected isInvitationsLoading: WritableSignal<boolean> = signal(true);
    // protected invitations: WritableSignal<SupabaseObjectReturn<'read_group_member_invitations'>[]> = signal([]);


    protected readonly columns: string[] = ['first_name', 'last_name', 'actions'];


    protected combinedForm: FormGroup;
    protected activeItemIndex: number = 0;
    protected showFilter: boolean = true;
    protected showMembers: boolean = true;
    protected showRequests: boolean = false;
    protected showInvitations: boolean = false;
    protected readonly signal = signal;

    constructor(
        // private readonly groupMemberStoreService: GroupMemberStoreService,
        // private readonly groupMemberActionService: GroupMemberActionService,
        // private readonly groupRequestsStoreService: GroupRequestsStoreService,
        // private readonly groupRequestsActionService: GroupRequestsActionService,
        // private readonly groupInvitationsStoreService: GroupInvitationsStoreService,
        // private readonly groupInvitationsActionService: GroupInvitationsActionService,
        private readonly formBuilder: FormBuilder
    ) {
        // this.isMembersLoading = this.groupMemberStoreService.groupMembers.loading.getLoading();
        // this.isInvitationsLoading = this.groupInvitationsStoreService.groupInvitations.loading.getLoading();
        // this.isRequestsLoading = this.groupRequestsStoreService.groupRequests.loading.getLoading();

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
        await this.groupMemberStore.read();
        // this.members = this.groupMemberStoreService.groupMembers.getObjects();
        // this.requests = this.groupRequestsStoreService.groupRequests.getObjects();
        // this.invitations = this.groupInvitationsStoreService.groupInvitations.getObjects();
    }

    protected onCombinedFormChange(): void {
        const stringFilter = this.combinedForm.get('filterStringForm')?.value.searchString;
        let filterByString: boolean = false;

        if (stringFilter) {
            filterByString = true;
        }

        if (this.showMembers) {
            this.groupMemberStore.setFilterState(
                {
                    filterByString: filterByString,
                    stringSearchKeys: ['first_name_', 'last_name_'],
                    searchString: stringFilter
                }
            );
            // this.groupMemberStoreService.groupMembers.filterArray(
            //     filterByString,
            //     ['first_name_', 'last_name_'],
            //     stringFilter
            // );
        }
    }

    protected async removeGroupMember(id: string): Promise<void> {
        await this.groupMemberStore.remove(id);
    }

    protected clearFilter(): void {
        this.combinedForm.reset();
        if (this.showMembers) {
            // this.groupMemberStoreService.groupMembers.resetDisplayedObjects();
            this.groupMemberStore.resetState();
        } else if (this.showRequests) {
            this.groupRequestsStore.resetState();
            // this.groupRequestsStoreService.groupRequests.resetDisplayedObjects();
        } else if (this.showInvitations) {
            this.groupInvitationsStore.resetState();
            // this.groupInvitationsStoreService.groupInvitations.resetDisplayedObjects();
        }
    }

    protected toggleShowFilter(): void {
        this.showFilter = !this.showFilter;
        this.clearFilter();
    }

    protected showGroupMemberList(): void {
        this.groupMemberStore.read();
        this.showInvitations = false;
        this.showRequests = false;
        this.showMembers = true;
    }

    protected showGroupRequestList(): void {
        this.groupRequestsStore.read();
        // this.groupRequestsActionService.readGroupRequests()
        this.showInvitations = false;
        this.showMembers = false;
        this.showRequests = true;
    }

    protected showGroupInvitationList(): void {
        this.groupInvitationsStore.read();
        this.showMembers = false;
        this.showRequests = false;
        this.showInvitations = true;
    }

    protected async withdrawInvitation(invitationId: string): Promise<void> {
        await this.groupInvitationsStore.remove(invitationId);
    }

    protected async acceptMembershipRequest(requestId: string): Promise<void> {
        await this.groupRequestsStore.accept(requestId);
        // await this.groupMemberActionService.acceptGroupMembershipRequest(requestId);
        // await console.log('accept request', requestId);
    }

    protected async declineMembershipRequest(requestId: string): Promise<void> {
        await this.groupRequestsStore.deleteById(requestId);
        // await this.groupMemberActionService.deleteGroupRequestById(requestId, true);
        // await console.log('decline request', requestId);
    }

    protected onSelectedUserUpdate(selectedUsers: SupabaseObjectReturn<'search_user'>[]): void {
        const addedUser: SupabaseObjectReturn<'search_user'> = selectedUsers[selectedUsers.length - 1];
        console.log('userId invite', addedUser.id_);
        this.groupInvitationsStore.invite(addedUser.id_);
    }
}
