import {Component, inject, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {FilterClearComponent} from '../../../ui/polity-filter/filter-clear/filter-clear.component';
import {FilterHeadlineComponent} from '../../../ui/polity-filter/filter-headline/filter-headline.component';
import {FilterStringComponent} from '../../../ui/polity-filter/filter-string/filter-string.component';
import {
    TableThreeIconTextDeleteComponent
} from '../../../ui/polity-table/table-three-icon-text-delete/table-three-icon-text-delete.component';
import {TuiTabsModule} from '@taiga-ui/kit';
import {FollowingsOfGroupStore} from '../store/followings-of-group.store';
import {FollowersOfGroupStore} from '../store/followers-of-group.store';

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
    protected followingsOfGroupStore: FollowingsOfGroupStore = inject(FollowingsOfGroupStore);
    protected followersOfGroupStore: FollowersOfGroupStore = inject(FollowersOfGroupStore);
    protected followersOfGroup: WritableSignal<SupabaseObjectReturn<'read_followers_of_group'>[]> = signal([]);
    protected followingsOfGroup: WritableSignal<SupabaseObjectReturn<'read_followings_of_group'>[]> = signal([]);
    protected isFollowersLoading: WritableSignal<boolean> = signal(true);
    protected isFollowingLoading: WritableSignal<boolean> = signal(true);
    protected readonly columns: string[] = ['first_name', 'last_name', 'actions'];
    protected activeItemIndex: number = 0;
    protected showFollowers: boolean = true;
    protected combinedForm: FormGroup;
    protected showFilter: boolean = true;
    protected readonly signal = signal;

    constructor(
        // private readonly followersOfGroupService: FollowerOfGroupActionService,
        // private readonly followingOfGroupService: FollowingOfGroupActionService,
        // private readonly followersOfGroupStoreService: FollowerOfGroupStoreService,
        // private readonly followingOfGroupStoreService: FollowingOfGroupStoreService,
        private readonly formBuilder: FormBuilder
    ) {
        // this.isFollowersLoading = this.followersOfGroupStoreService.followersOfGroup.loading.getLoading();
        // this.isFollowingLoading = this.followingOfGroupStoreService.followingOfGroup.loading.getLoading();

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
        // this.followersOfGroup = this.followersOfGroupStoreService.followersOfGroup.getObjects();
        // this.followingsOfGroup = this.followingOfGroupStoreService.followingOfGroup.getObjects();
    }

    protected onCombinedFormChange(): void {
        const stringFilter = this.combinedForm.get('filterStringForm')?.value.searchString;
        let filterByString: boolean = false;

        if (stringFilter) {
            filterByString = true;
        }

        if (this.showFollowers) {
            this.followersOfGroupStore.setFilterState(
                {
                    filterByString: filterByString,
                    stringSearchKeys: ['first_name_', 'last_name_'],
                    searchString: stringFilter
                }
            );
        } else {
            this.followingsOfGroupStore.setFilterState(
                {
                    filterByString: filterByString,
                    stringSearchKeys: ['first_name_', 'last_name_'],
                    searchString: stringFilter
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
            this.followersOfGroupStore.resetState();
        } else {
            this.followingsOfGroupStore.resetState();
        }
    }

    protected toggleShowFilter(): void {
        this.showFilter = !this.showFilter;
        this.clearFilter();
    }
}