import {Component, inject, signal, WritableSignal} from '@angular/core';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {
    TableThreeIconTextDeleteComponent
} from '../../../ui/polity-table/table-three-icon-text-delete/table-three-icon-text-delete.component';
import {TuiTabsModule} from '@taiga-ui/kit';
import {FilterClearComponent} from '../../../ui/polity-filter/filter-clear/filter-clear.component';
import {FilterHeadlineComponent} from '../../../ui/polity-filter/filter-headline/filter-headline.component';
import {FilterStringComponent} from '../../../ui/polity-filter/filter-string/filter-string.component';
import {FollowingsOfUserStore} from '../store/followings-of-user.store';
import {FollowersOfUserStore} from '../store/followers-of-user.store';
import {FollowingsOfUserGroupStore} from '../store/followings-of-user-group.store';

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
    protected followingsOfUserStore: FollowingsOfUserStore = inject(FollowingsOfUserStore);
    protected followersOfUserStore: FollowersOfUserStore = inject(FollowersOfUserStore);
    protected followingsOfUserGroupStore: FollowingsOfUserGroupStore = inject(FollowingsOfUserGroupStore);
    protected isFollowingGroupLoading: WritableSignal<boolean> = signal(true);
    protected followingsOfUserGroup: WritableSignal<SupabaseObjectReturn<'read_group_followings_of_user'>[]> = signal([]);

    // protected isFollowersLoading: WritableSignal<boolean> = signal(true);
    // protected followersOfUser: WritableSignal<SupabaseObjectReturn<'read_followers_of_user'>[]> = signal([]);

    protected readonly columns: string[] = ['first_name', 'last_name', 'actions'];
    protected activeItemIndex: number = 0;
    protected combinedForm: FormGroup;
    protected showFilter: boolean = true;

    protected showFollowers: boolean = true;
    protected showFollowings: boolean = false;
    protected showFollowingGroups: boolean = false;
    protected readonly signal = signal;

    constructor(
        // private readonly followersOfUserActionService: FollowersOfUserActionService,
        // private readonly followersOfUserStoreService: FollowersOfUserStoreService,
        // private readonly followingGroupsOfUserActionService: FollowingGroupsOfUserActionService,
        // private readonly followingGroupsOfUserStoreService: FollowingGroupsOfUserStoreService,
        private readonly formBuilder: FormBuilder
    ) {
        // this.isFollowersLoading = this.followersOfUserStoreService.followersOfUser.loading.getLoading();
        // this.isFollowingGroupLoading = this.followingGroupsOfUserStoreService.followingGroupsOfUser.loading.getLoading();

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
        await this.followingsOfUserStore.read();
        await this.followersOfUserStore.read();
        // await this.followersOfUserActionService.readFollowersOfUser();
        // this.followersOfUser = this.followersOfUserStoreService.followersOfUser.getObjects();
        // this.followingsOfUserGroup = this.followingGroupsOfUserStoreService.followingGroupsOfUser.getObjects();
    }

    onCombinedFormChange(): void {
        const stringFilter = this.combinedForm.get('filterStringForm')?.value.searchString;
        let filterByString: boolean = false;

        if (stringFilter) {
            filterByString = true;
        }

        if (this.showFollowers) {
            this.followersOfUserStore.setFilterState({
                filterByString: filterByString,
                stringSearchKeys: ['first_name_', 'last_name_'],
                searchString: stringFilter
            });
            // this.followersOfUserStoreService.followersOfUser.filterArray(
            //     filterByString,
            //     ['first_name_', 'last_name_'],
            //     stringFilter
            // );
        } else if(this.showFollowings) {
            this.followingsOfUserStore.setFilterState({
                filterByString: filterByString,
                stringSearchKeys: ['first_name_', 'last_name_'],
                searchString: stringFilter
            });
            // this.followingsOfUserStore.setFilterState(
            //     {
            //         filterByString: filterByString,
            //         stringSearchKeys: ['first_name_', 'last_name_'],
            //         searchString: stringFilter
            //     }
            // );
        } else if (this.showFollowingGroups) {
            this.followingsOfUserGroupStore.setFilterState({
                filterByString: filterByString,
                stringSearchKeys: ['name_'],
                searchString: stringFilter
            });
        }
    }

    protected showFollowerList(): void {
        this.followersOfUserStore.read();
        // this.followersOfUserActionService.readFollowersOfUser();
        this.showFollowers = true;
        this.showFollowings = false;
        this.showFollowingGroups = false;
    }

    protected showFollowingList(): void {
        this.followingsOfUserStore.read();
        this.showFollowers = false;
        this.showFollowings = true;
        this.showFollowingGroups = false;
    }

    protected showFollowingGroupList(): void {
        this.followingsOfUserGroupStore.read();
        // this.followingGroupsOfUserActionService.readFollowingGroupsOfUser();
        this.showFollowers = false;
        this.showFollowings = false;
        this.showFollowingGroups = true;
    }

    protected async removeFollower(id: string): Promise<void> {
        await this.followersOfUserStore.remove(id)
        // await this.followersOfUserActionService.removeFollowerOfUser(id);
    }

    protected async removeFollowing(id: string): Promise<void> {
        await this.followingsOfUserStore.delete(id);
    }

    protected async removeFollowingGroup(id: string): Promise<void> {
        this.followingsOfUserGroupStore.remove(id);
        // await this.followingGroupsOfUserActionService.removeFollowingGroupOfUser(id);
    }

    protected clearFilter(): void {
        this.combinedForm.reset();
        if (this.showFollowers) {
            this.followersOfUserStore.resetState()
            // this.followersOfUserStoreService.followersOfUser.resetDisplayedObjects();
        } else if(this.showFollowings) {
            this.followingsOfUserStore.resetState();
        }else if (this.showFollowingGroups) {
            this.followingsOfUserGroupStore.resetState();
            // this.followingGroupsOfUserStoreService.followingGroupsOfUser.resetDisplayedObjects();
        }
    }

    protected toggleShowFilter(): void {
        this.showFilter = !this.showFilter;
        this.clearFilter();
    }
}
