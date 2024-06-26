import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {
    TableThreeIconTextDeleteComponent
} from '@polity-ui/polity-table/table-three-icon-text-delete/table-three-icon-text-delete.component';
import {TuiTabsModule} from '@taiga-ui/kit';
import {FilterStringComponent} from '@polity-ui/polity-filter/filter-string/filter-string.component';
import {FilterClearComponent} from '@polity-ui/polity-filter/filter-clear/filter-clear.component';
import {FilterHeadlineComponent} from '@polity-ui/polity-filter/filter-headline/filter-headline.component';
import {FollowingsOfUserStore} from '@polity-profile/profile-follow-state/followings-of-user.store';
import {FollowersOfUserStore} from '@polity-profile/profile-follow-state/followers-of-user.store';
import {FollowingsOfUserGroupStore} from '@polity-profile/profile-follow-state/followings-of-user-group.store';
import {ProfileLoadHelperService} from '@polity-profile/state/profile-load-helper.service';
import {Router} from '@angular/router';

@Component({
    selector: 'polity-follow-button-edit',
    templateUrl: './profile-follow-edit.page.html',
    styleUrls: ['./profile-follow-edit.page.less'],
    standalone: true,
    imports: [
        CommonModule,
        TableThreeIconTextDeleteComponent,
        TuiTabsModule,
        FilterClearComponent,
        FilterHeadlineComponent,
        ReactiveFormsModule,
        FilterStringComponent
    ],
    providers: [
        FollowingsOfUserStore,
        FollowersOfUserStore,
        FollowingsOfUserGroupStore
    ]
})
export class ProfileFollowEditPage {
    protected followingsOfUserStore: FollowingsOfUserStore = inject(FollowingsOfUserStore);
    protected followersOfUserStore: FollowersOfUserStore = inject(FollowersOfUserStore);
    protected followingsOfUserGroupStore: FollowingsOfUserGroupStore = inject(FollowingsOfUserGroupStore);
    protected profileLoadHelperService: ProfileLoadHelperService = inject(ProfileLoadHelperService);
    protected readonly columns: string[] = ['first_name', 'last_name', 'actions'];
    protected activeItemIndex: number = 0;
    protected combinedForm: FormGroup;
    protected showFilter: boolean = true;
    protected showFollowers: boolean = true;
    protected showFollowings: boolean = false;
    protected showFollowingGroups: boolean = false;
    protected readonly signal = signal;
    private router: Router = inject(Router);

    constructor(private readonly formBuilder: FormBuilder
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
        await this.followingsOfUserStore.read();
        await this.followersOfUserStore.read();
    }

    onCombinedFormChange(): void {
        const stringFilter = this.combinedForm.get('filterStringForm')?.value.searchString;
        let filterByString: boolean = false;

        if (stringFilter) {
            filterByString = true;
        }

        if (this.showFollowers) {
            this.followersOfUserStore.setFilterState({
                filterByStringState: {
                    filterByString: filterByString,
                    stringSearchKeys: ['first_name_', 'last_name_'],
                    searchString: stringFilter
                }
            });
        } else if (this.showFollowings) {
            this.followingsOfUserStore.setFilterState({
                filterByStringState: {
                    filterByString: filterByString,
                    stringSearchKeys: ['first_name_', 'last_name_'],
                    searchString: stringFilter
                }
            });
        } else if (this.showFollowingGroups) {
            this.followingsOfUserGroupStore.setFilterState({
                filterByStringState: {
                    filterByString: filterByString,
                    stringSearchKeys: ['name_'],
                    searchString: stringFilter
                }
            });
        }
    }

    protected onNavigateToProfile(id: string): void {
        this.profileLoadHelperService.loadData(id);
        this.router.navigateByUrl('/profile/' + id);
    }

    protected onNavigateToGroup(id: string): void {
        this.profileLoadHelperService.loadData(id);
        this.router.navigateByUrl('/group/' + id);
    }

    protected showFollowerList(): void {
        this.followersOfUserStore.read();
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
        this.showFollowers = false;
        this.showFollowings = false;
        this.showFollowingGroups = true;
    }

    protected async removeFollower(id: string): Promise<void> {
        await this.followersOfUserStore.remove(id);
    }

    protected async removeFollowing(id: string): Promise<void> {
        await this.followingsOfUserStore.delete(id);
    }

    protected async removeFollowingGroup(id: string): Promise<void> {
        this.followingsOfUserGroupStore.remove(id);
    }

    protected clearFilter(): void {
        this.combinedForm.reset();
        if (this.showFollowers) {
            this.followersOfUserStore.emptyStore();
        } else if (this.showFollowings) {
            this.followingsOfUserStore.emptyStore();
        } else if (this.showFollowingGroups) {
            this.followingsOfUserGroupStore.emptyStore();
        }
    }

    protected toggleShowFilter(): void {
        this.showFilter = !this.showFilter;
        this.clearFilter();
    }
}
