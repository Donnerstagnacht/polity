import {Component, inject, signal} from '@angular/core';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    TableThreeIconTextDeleteComponent
} from '@polity-ui/polity-table/table-three-icon-text-delete/table-three-icon-text-delete.component';
import {TuiTabsModule} from '@taiga-ui/kit';
import {
    TableThreeIconTextTwoActionsComponent
} from '@polity-ui/polity-table/table-three-icon-text-two-actions/table-three-icon-text-two-actions.component';
import {SearchProfilesBarComponent} from '@polity-search/search-ui/search-profiles-bar/search-profiles-bar.component';
import {FilterStringComponent} from '@polity-ui/polity-filter/filter-string/filter-string.component';
import {FilterClearComponent} from '@polity-ui/polity-filter/filter-clear/filter-clear.component';
import {FilterHeadlineComponent} from '@polity-ui/polity-filter/filter-headline/filter-headline.component';
import {GroupInvitationsStore} from '@polity-group/group-member-state/group-invitations.store';
import {GroupMembersStore} from '@polity-group/group-member-state/group-members.store';
import {GroupRequestsStore} from '@polity-group/group-member-state/group-requests.store';
import {ProfileLoadHelperService} from '@polity-profile/state/profile-load-helper.service';
import {Router} from '@angular/router';

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
    templateUrl: './group-member-edit.page.html',
    styleUrl: './group-member-edit.page.less'
})
export class GroupMemberEditPage {
    protected groupMemberStore: GroupMembersStore = inject(GroupMembersStore);
    protected groupRequestsStore: GroupRequestsStore = inject(GroupRequestsStore);
    protected router: Router = inject(Router);
    protected groupInvitationsStore: GroupInvitationsStore = inject(GroupInvitationsStore);
    protected profileLoadHelperService: ProfileLoadHelperService = inject(ProfileLoadHelperService);

    protected readonly columns: string[] = ['first_name', 'last_name', 'actions'];

    protected combinedForm: FormGroup;
    protected activeItemIndex: number = 0;
    protected showFilter: boolean = true;
    protected showMembers: boolean = true;
    protected showRequests: boolean = false;
    protected showInvitations: boolean = false;
    protected readonly signal = signal;

    constructor(
        private readonly formBuilder: FormBuilder
    ) {
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
                    filterByStringState: {
                        filterByString: filterByString,
                        stringSearchKeys: ['first_name_', 'last_name_'],
                        searchString: stringFilter
                    }
                }
            );
        } else if (this.showRequests) {
            this.groupRequestsStore.setFilterState(
                {
                    filterByStringState: {
                        filterByString: filterByString,
                        stringSearchKeys: ['first_name_', 'last_name_'],
                        searchString: stringFilter
                    }
                }
            );
        } else if (this.showInvitations) {
            this.groupInvitationsStore.setFilterState(
                {
                    filterByStringState: {
                        filterByString: filterByString,
                        stringSearchKeys: ['first_name_', 'last_name_'],
                        searchString: stringFilter
                    }
                }
            );
        }
    }

    protected onNavigateToProfile(id: string): void {
        this.profileLoadHelperService.loadData(id);
        this.router.navigateByUrl('/profile/' + id);
    }

    protected async removeGroupMember(id: string): Promise<void> {
        await this.groupMemberStore.remove(id);
    }

    protected clearFilter(): void {
        this.combinedForm.reset();
        if (this.showMembers) {
            this.groupMemberStore.resetFilterState();
        } else if (this.showRequests) {
            this.groupRequestsStore.resetFilterState();
        } else if (this.showInvitations) {
            this.groupInvitationsStore.resetFilterState();
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
    }

    protected async declineMembershipRequest(requestId: string): Promise<void> {
        await this.groupRequestsStore.deleteById(requestId);
    }

    protected onSelectedUserUpdate(selectedUsers: SupabaseObjectReturn<'search_user'>[]): void {
        const addedUser: SupabaseObjectReturn<'search_user'> = selectedUsers[selectedUsers.length - 1];
        console.log('userId invite', addedUser.id_);
        this.groupInvitationsStore.invite(addedUser.id_);
    }
}
