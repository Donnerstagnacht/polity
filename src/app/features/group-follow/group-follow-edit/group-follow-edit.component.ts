import {Component, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {FollowerOfGroupActionService} from "../action-store-services/follower-of-group.action.service";
import {FollowingOfGroupActionService} from "../action-store-services/following-of-group.action.service";
import {FollowerOfGroupStoreService} from "../action-store-services/follower-of-group.store.service";
import {FollowingOfGroupStoreService} from "../action-store-services/following-of-group.store.service";
import {FilterClearComponent} from "../../../ui/polity-filter/filter-clear/filter-clear.component";
import {FilterHeadlineComponent} from "../../../ui/polity-filter/filter-headline/filter-headline.component";
import {FilterStringComponent} from "../../../ui/polity-filter/filter-string/filter-string.component";
import {
    TableThreeIconTextDeleteComponent
} from "../../../ui/polity-table/table-three-icon-text-delete/table-three-icon-text-delete.component";
import {TuiTabsModule} from "@taiga-ui/kit";

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
    templateUrl: './group-follow-edit.component.html',
    styleUrl: './group-follow-edit.component.less'
})
export class GroupFollowEditComponent {
    protected followersOfGroup: WritableSignal<SupabaseObjectReturn<'read_followers_of_group'>[]> = signal([]);
    protected followingsOfGroup: WritableSignal<SupabaseObjectReturn<'read_followings_of_group'>[]> = signal([]);
    protected isFollowersLoading: WritableSignal<boolean> = signal(true);
    protected isFollowingLoading: WritableSignal<boolean> = signal(true);
    protected readonly columns: string[] = ['first_name', 'last_name', 'actions'];
    protected activeItemIndex: number = 0;
    protected showFollowers: boolean = true;
    protected combinedForm: FormGroup;
    protected showFilter: boolean = true;

    constructor(
        private readonly followersOfGroupService: FollowerOfGroupActionService,
        private readonly followingOfGroupService: FollowingOfGroupActionService,
        private readonly followersOfGroupStoreService: FollowerOfGroupStoreService,
        private readonly followingOfGroupStoreService: FollowingOfGroupStoreService,
        private readonly formBuilder: FormBuilder
    ) {
        this.isFollowersLoading = this.followersOfGroupStoreService.followersOfGroup.loading.getLoading();
        this.isFollowingLoading = this.followingOfGroupStoreService.followingOfGroup.loading.getLoading();

        this.combinedForm = this.formBuilder.group({
            filterStringForm: this.formBuilder.group({
                searchString: [],
            })
        })
        this.combinedForm.valueChanges.subscribe(
            () => this.onCombinedFormChange());
    }

    async ngOnInit(): Promise<void> {
        await Promise.all(
            [
                this.followersOfGroupService.readFollowersOfGroup(),
                this.followingOfGroupService.readFollowingsOfGroup(),
            ]
        )
        this.followersOfGroup = this.followersOfGroupStoreService.followersOfGroup.getObjects();
        this.followingsOfGroup = this.followingOfGroupStoreService.followingOfGroup.getObjects();
    }

    protected onCombinedFormChange(): void {
        const stringFilter = this.combinedForm.get('filterStringForm')?.value.searchString;
        let filterByString: boolean = false;

        if (stringFilter) {
            filterByString = true;
        }

        if (this.showFollowers) {
            this.followersOfGroupStoreService.followersOfGroup.filterArray(
                filterByString,
                ['first_name_', 'last_name_'],
                stringFilter
            )
        } else {
            this.followingOfGroupStoreService.followingOfGroup.filterArray(
                filterByString,
                ['first_name_', 'last_name_'],
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
        await this.followersOfGroupService.removeFollowerOfGroup(id);
    }

    protected async removeFollowing(id: string): Promise<void> {
        await this.followingOfGroupService.removeFollowingOfUser(id);
    }

    protected clearFilter(): void {
        this.combinedForm.reset()
        if (this.showFollowers) {
            this.followersOfGroupStoreService.followersOfGroup.resetDisplayedObjects();
        } else {
            this.followingOfGroupStoreService.followingOfGroup.resetDisplayedObjects();
        }
    }

    protected toggleShowFilter(): void {
        this.showFilter = !this.showFilter
        this.clearFilter()
    }

}
