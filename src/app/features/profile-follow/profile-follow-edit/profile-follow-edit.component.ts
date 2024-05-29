import {Component, signal, WritableSignal} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {
    TableThreeIconTextDeleteComponent
} from "../../../ui/polity-table/table-three-icon-text-delete/table-three-icon-text-delete.component";
import {TuiTabsModule} from "@taiga-ui/kit";
import {FilterClearComponent} from "../../../ui/polity-filter/filter-clear/filter-clear.component";
import {FilterHeadlineComponent} from "../../../ui/polity-filter/filter-headline/filter-headline.component";
import {FilterStringComponent} from "../../../ui/polity-filter/filter-string/filter-string.component";
import {FollowersOfUserStoreService} from "../action-store-services/followers-of-user.store.service";
import {FollowingOfUserStoreService} from "../action-store-services/following-of-user.store.service";
import {FollowersOfUserActionService} from "../action-store-services/followers-of-user.action.service";
import {FollowingOfUserActionService} from "../action-store-services/following-of-user.action.service";
import {FollowingGroupsOfUserStoreService} from "../action-store-services/following-groups-of-user.store.service";
import {FollowingGroupsOfUserActionService} from "../action-store-services/following-groups-of-user.action.service";

@Component({
    selector: 'polity-follow-button-edit',
    templateUrl: './profile-follow-edit.component.html',
    styleUrls: ['./profile-follow-edit.component.less'],
    standalone: true,
    imports: [
        CommonModule,
        TableThreeIconTextDeleteComponent,
        TuiTabsModule,
        FilterClearComponent,
        FilterHeadlineComponent,
        ReactiveFormsModule,
        FilterStringComponent
    ]

})
export class ProfileFollowEditComponent {
    protected isFollowingLoading: WritableSignal<boolean> = signal(true);
    protected followingsOfUser: WritableSignal<SupabaseObjectReturn<'read_followings_of_user'>[]> = signal([]);

    protected isFollowingGroupLoading: WritableSignal<boolean> = signal(true);
    protected followingsOfUserGroup: WritableSignal<SupabaseObjectReturn<'read_group_followings_of_user'>[]> = signal([]);

    protected isFollowersLoading: WritableSignal<boolean> = signal(true);
    protected followersOfUser: WritableSignal<SupabaseObjectReturn<'read_followers_of_user'>[]> = signal([]);

    protected readonly columns: string[] = ['first_name', 'last_name', 'actions'];
    protected activeItemIndex: number = 0;
    protected combinedForm: FormGroup;
    protected showFilter: boolean = true;

    protected showFollowers: boolean = true;
    protected showFollowing: boolean = false;
    protected showFollowingGroups: boolean = false;

    constructor(
        private readonly followersOfUserActionService: FollowersOfUserActionService,
        private readonly followersOfUserStoreService: FollowersOfUserStoreService,
        private readonly followingOfUserActionService: FollowingOfUserActionService,
        private readonly followingOfUserStoreService: FollowingOfUserStoreService,
        private readonly followingGroupsOfUserActionService: FollowingGroupsOfUserActionService,
        private readonly followingGroupsOfUserStoreService: FollowingGroupsOfUserStoreService,
        private readonly formBuilder: FormBuilder
    ) {
        this.isFollowersLoading = this.followersOfUserStoreService.followersOfUser.loading.getLoading();
        this.isFollowingLoading = this.followingOfUserStoreService.followingOfUser.loading.getLoading();
        this.isFollowingGroupLoading = this.followingGroupsOfUserStoreService.followingGroupsOfUser.loading.getLoading();

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
        // await Promise.all(
        //     [
        //         this.followersOfUserService.readFollowersOfUser(),
        //         this.followingOfUserService.readFollowingsOfUser(),
        //         this.followingGroupsOfUserActionService.readFollowingsOfUser(),
        //     ]
        // )
        await this.followersOfUserActionService.readFollowersOfUser();
        this.followersOfUser = this.followersOfUserStoreService.followersOfUser.getObjects();
        this.followingsOfUser = this.followingOfUserStoreService.followingOfUser.getObjects();
        this.followingsOfUserGroup = this.followingGroupsOfUserStoreService.followingGroupsOfUser.getObjects();
    }

    onCombinedFormChange(): void {
        const stringFilter = this.combinedForm.get('filterStringForm')?.value.searchString;
        let filterByString: boolean = false;

        if (stringFilter) {
            filterByString = true;
        }

        if (this.showFollowers) {
            this.followersOfUserStoreService.followersOfUser.filterArray(
                filterByString,
                ['first_name_', 'last_name_'],
                stringFilter,
            )
        } else {
            this.followingOfUserStoreService.followingOfUser.filterArray(
                filterByString,
                ['first_name_', 'last_name_'],
                stringFilter
            )
        }
    }

    protected showFollowerList(): void {
        this.followersOfUserActionService.readFollowersOfUser()
        this.showFollowers = true;
        this.showFollowing = false;
        this.showFollowingGroups = false;
    }

    protected showFollowingList(): void {
        this.followingOfUserActionService.readFollowingsOfUser()
        this.showFollowers = false;
        this.showFollowing = true;
        this.showFollowingGroups = false;
    }

    protected showFollowingGroupList(): void {
        this.followingGroupsOfUserActionService.readFollowingGroupsOfUser()
        this.showFollowers = false;
        this.showFollowing = false;
        this.showFollowingGroups = true;
    }

    protected async removeFollower(id: string): Promise<void> {
        await this.followersOfUserActionService.removeFollowerOfUser(id);
    }

    protected async removeFollowing(id: string): Promise<void> {
        await this.followingOfUserActionService.removeFollowingOfUser(id);
    }

    protected async removeFollowingGroup(id: string): Promise<void> {
        await this.followingGroupsOfUserActionService.removeFollowingGroupOfUser(id);
    }

    protected clearFilter(): void {
        this.combinedForm.reset()
        if (this.showFollowers) {
            this.followersOfUserStoreService.followersOfUser.resetDisplayedObjects();
        } else if (this.showFollowing) {
            this.followingOfUserStoreService.followingOfUser.resetDisplayedObjects();
        } else if (this.showFollowingGroups) {
            this.followingGroupsOfUserStoreService.followingGroupsOfUser.resetDisplayedObjects();
        }
    }

    protected toggleShowFilter(): void {
        this.showFilter = !this.showFilter
        this.clearFilter()
    }
}
