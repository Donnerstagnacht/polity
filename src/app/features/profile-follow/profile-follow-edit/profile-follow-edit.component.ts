import {Component, signal, WritableSignal} from '@angular/core';
import {ProfileFollowService} from "../services/profile-follow.service";
import {FollowersOfUserService} from "../services/followers-of-user.service";
import {Functions} from "../../../../../supabase/types/supabase.shorthand-types";
import {FollowersOfUserStoreService} from "../services/followers-of-user-store.service";
import {FollowingOfUserService} from "../services/following-of-user.service";
import {FollowingOfUserStoreService} from "../services/following-of-user-store.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'polity-follow-button-edit',
    templateUrl: './profile-follow-edit.component.html',
    styleUrls: ['./profile-follow-edit.component.less'],

})
export class ProfileFollowEditComponent {
    protected followersOfUser: WritableSignal<Functions<'select_follower_of_user'>> = signal([]);
    protected followingsOfUser: WritableSignal<Functions<'select_following_of_user'>> = signal([]);
    protected isFollowersLoading: WritableSignal<boolean> = signal(true);
    protected isFollowingLoading: WritableSignal<boolean> = signal(true);
    protected readonly columns: string[] = ['first_name', 'last_name', 'actions'];
    protected activeItemIndex: number = 0;

    protected showFollowers: boolean = true;
    //protected readonly signal = signal;

    protected combinedForm: FormGroup;
    protected showFilter: boolean = true;

    constructor(
        private readonly profileFollowService: ProfileFollowService,
        private readonly followersOfUserService: FollowersOfUserService,
        private readonly followingOfUserService: FollowingOfUserService,
        private readonly followersOfUserStoreService: FollowersOfUserStoreService,
        private readonly followingOfUserStoreService: FollowingOfUserStoreService,
        private readonly formBuilder: FormBuilder
    ) {
        this.isFollowersLoading = this.followersOfUserStoreService.followersOfUser.loading.getLoading();
        this.isFollowingLoading = this.followingOfUserStoreService.followingOfUser.loading.getLoading();
        // this.isFollowersLoading = this.followersOfUserStoreService.followersOfUser.loading.getLoading();
        // this.isFollowingLoading = this.followingOfUserStoreService.followingOfUser.loading.getLoading();

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

        console.log('searchTerm', stringFilter)
        let filterByString: boolean = false;
        let filterByType: boolean = false;
        let filterByDate: boolean = false;

        if (stringFilter) {
            filterByString = true;
        }

        if (this.showFollowers) {
            console.log('filter followers')
            this.followersOfUserStoreService.followersOfUser.filterArray(
                filterByString,
                ['first_name', 'last_name'],
                stringFilter,

                // filterByType,
                // 'type_of_notification',
                // typeKeyValues,
                //
                // filterByDate,
                // 'created_at',
                // dateFilterFrom,
                // dateFilterTo
            )
        } else {
            console.log('filter following')

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
        this.followersOfUserService.removeFollowerOfUser(id);
    }

    protected removeFollowing(id: string): void {
        console.log(id)
        this.followingOfUserService.removeFollowingOfUser(id);
    }

    protected clearFilter(): void {
        this.combinedForm.reset()
        if (this.showFollowers) {
            console.log('clear followers')
            this.followersOfUserStoreService.followersOfUser.resetDisplayedObjects();
        } else {
            console.log('clear following')
            this.followingOfUserStoreService.followingOfUser.resetDisplayedObjects();
        }
        // this.followersOfUserStoreService.followersOfUser.resetFilteredEntities();
        // this.followingOfUserStoreService.followingOfUser.resetFilteredEntities();
        // this.notificationStoreService.notifications.resetFilteredEntities()
    }

    protected toggleShowFilter(): void {
        if (!this.showFilter) {
            console.log('activate filter')
        }
        this.showFilter = !this.showFilter
        this.clearFilter()
    }
}