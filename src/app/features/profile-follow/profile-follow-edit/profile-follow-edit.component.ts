import {Component, signal, WritableSignal} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
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
    protected followersOfUser: WritableSignal<SupabaseObjectReturn<'read_follower_of_user'>[]> = signal([]);
    protected followingsOfUser: WritableSignal<SupabaseObjectReturn<'read_following_of_user'>[]> = signal([]);
    protected isFollowersLoading: WritableSignal<boolean> = signal(true);
    protected isFollowingLoading: WritableSignal<boolean> = signal(true);
    protected readonly columns: string[] = ['first_name', 'last_name', 'actions'];
    protected activeItemIndex: number = 0;
    protected showFollowers: boolean = true;
    protected combinedForm: FormGroup;
    protected showFilter: boolean = true;

    constructor(
        private readonly followersOfUserService: FollowersOfUserActionService,
        private readonly followingOfUserService: FollowingOfUserActionService,
        private readonly followersOfUserStoreService: FollowersOfUserStoreService,
        private readonly followingOfUserStoreService: FollowingOfUserStoreService,
        private readonly formBuilder: FormBuilder
    ) {
        this.isFollowersLoading = this.followersOfUserStoreService.followersOfUser.loading.getLoading();
        this.isFollowingLoading = this.followingOfUserStoreService.followingOfUser.loading.getLoading();

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
        await Promise.all(
            [
                this.followersOfUserService.selectFollowersOfUser(),
                this.followingOfUserService.selectFollowingsOfUser(),
            ]
        )
        this.followersOfUser = this.followersOfUserStoreService.followersOfUser.getObjects();
        this.followingsOfUser = this.followingOfUserStoreService.followingOfUser.getObjects();
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
                ['first_name', 'last_name'],
                stringFilter,
            )
        } else {
            this.followingOfUserStoreService.followingOfUser.filterArray(
                filterByString,
                ['first_name', 'last_name'],
                stringFilter
            )
        }
    }

    protected showFollowerList(): void {
        this.showFollowers = true;
    }

    protected showFollowingList(): void {
        this.showFollowers = false;
    }

    protected async removeFollower(id: string): Promise<void> {
        await this.followersOfUserService.removeFollowerOfUser(id);
    }

    protected async removeFollowing(id: string): Promise<void> {
        await this.followingOfUserService.removeFollowingOfUser(id);
    }

    protected clearFilter(): void {
        this.combinedForm.reset()
        if (this.showFollowers) {
            this.followersOfUserStoreService.followersOfUser.resetDisplayedObjects();
        } else {
            this.followingOfUserStoreService.followingOfUser.resetDisplayedObjects();
        }
    }

    protected toggleShowFilter(): void {
        this.showFilter = !this.showFilter
        this.clearFilter()
    }
}
