import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

import {
    TableThreeIconTextDeleteComponent
} from '@polity-ui/polity-table/table-three-icon-text-delete/table-three-icon-text-delete.component';
import {TuiTabsModule} from '@taiga-ui/kit';
import {FilterClearComponent} from '@polity-ui/polity-filter/filter-clear/filter-clear.component';
import {FilterHeadlineComponent} from '@polity-ui/polity-filter/filter-headline/filter-headline.component';
import {FilterStringComponent} from '@polity-ui/polity-filter/filter-string/filter-string.component';
import {FollowingsOfGroupStore} from '@polity-group/group-follow-state/followings-of-group.store';
import {FollowersOfGroupStore} from '@polity-group/group-follow-state/followers-of-group.store';
import {ProfileLoadHelperService} from '@polity-profile/state/profile-load-helper.service';
import {Router} from '@angular/router';

@Component({
    selector: 'polity-group-follow-edit',
    standalone: true,
    imports: [
        FilterClearComponent,
        FilterHeadlineComponent,
        FilterStringComponent,
        ReactiveFormsModule,
        TableThreeIconTextDeleteComponent,
        TuiTabsModule
    ],
    templateUrl: './group-follow-edit.page.html',
    styleUrl: './group-follow-edit.page.less'
})
export class GroupFollowEditPage {
    protected followingsOfGroupStore: FollowingsOfGroupStore = inject(FollowingsOfGroupStore);
    protected followersOfGroupStore: FollowersOfGroupStore = inject(FollowersOfGroupStore);
    protected router: Router = inject(Router);
    protected profileLoadHelperService: ProfileLoadHelperService = inject(ProfileLoadHelperService);
    protected readonly columns: string[] = ['first_name', 'last_name', 'actions'];
    protected activeItemIndex: number = 0;
    protected showFollowers: boolean = true;
    protected combinedForm: FormGroup;
    protected showFilter: boolean = true;
    protected readonly signal = signal;

    constructor(private readonly formBuilder: FormBuilder) {
        this.combinedForm = this.formBuilder.group({
            filterStringForm: this.formBuilder.group({
                searchString: []
            })
        });
        this.combinedForm.valueChanges.subscribe(
            () => this.onCombinedFormChange());
    }

    async ngOnInit(): Promise<void> {
        await Promise.all(
            [
                this.followersOfGroupStore.read(),
                this.followingsOfGroupStore.read()
            ]
        );
    }

    protected onNavigateToProfile(id: string): void {
        this.profileLoadHelperService.loadData(id);
        this.router.navigateByUrl('/profile/' + id);
    }

    protected onCombinedFormChange(): void {
        const stringFilter = this.combinedForm.get('filterStringForm')?.value.searchString;
        let filterByString: boolean = false;

        if (stringFilter) {
            filterByString = true;
        }

        if (this.showFollowers) {
            this.followersOfGroupStore.setFilterState({
                    filterByStringState: {
                        filterByString: filterByString,
                        stringSearchKeys: ['first_name_', 'last_name_'],
                        searchString: stringFilter
                    }
                }
            );
        } else {
            this.followingsOfGroupStore.setFilterState({
                    filterByStringState: {
                        filterByString: filterByString,
                        stringSearchKeys: ['first_name_', 'last_name_'],
                        searchString: stringFilter
                    }
                }
            );
        }
    }

    protected showFollowerList(): void {
        this.showFollowers = true;
    }

    protected showFollowingList(): void {
        this.showFollowers = false;
    }

    protected async removeFollower(id: string): Promise<void> {
        await this.followersOfGroupStore.remove(id);
    }

    protected async removeFollowing(id: string): Promise<void> {
        await this.followingsOfGroupStore.remove(id);
    }

    protected clearFilter(): void {
        this.combinedForm.reset();
        if (this.showFollowers) {
            this.followersOfGroupStore.resetFilterState();
        } else {
            this.followingsOfGroupStore.resetFilterState();
        }
    }

    protected toggleShowFilter(): void {
        this.showFilter = !this.showFilter;
        this.clearFilter();
    }
}
