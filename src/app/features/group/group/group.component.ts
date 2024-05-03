import {Component, signal, Signal, WritableSignal} from '@angular/core';
import {GroupActionService} from "../action-store-service/group.action.service";
import {ActivatedRoute} from "@angular/router";
import {WikiHeadlineComponent} from "../../../ui/polity-wiki/wiki-headline/wiki-headline.component";
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {GroupStoreService} from "../action-store-service/group.store.service";
import {FollowButton} from "../../../ui/polity-wiki/follow-button/follow-button.component";
import {RequestButton} from "../../../ui/polity-wiki/request-button/request-button.component";

@Component({
    selector: 'polity-group',
    standalone: true,
    imports: [
        WikiHeadlineComponent,
        FollowButton,
        RequestButton
    ],
    templateUrl: './group.component.html',
    styleUrl: './group.component.less'
})
export class GroupComponent {
    protected group: Signal<FunctionSingleReturn<'read_group_columns'> | null> = signal(null);
    protected readonly signal = signal;
    protected isGroupLoading: WritableSignal<boolean> = signal(true);

    protected isFollowingCheckLoading: WritableSignal<boolean> = signal(false);
    protected isFollowing: WritableSignal<boolean> = signal(false);

    constructor(
        private groupActionService: GroupActionService,
        private groupStoreService: GroupStoreService,
        private route: ActivatedRoute
    ) {

    }

    async ngOnInit(): Promise<void> {
        const urlId: string = this.route.snapshot.params['id'];
        await this.groupActionService.readGroup(urlId);
        this.group = this.groupStoreService.group.getObject();
        this.isGroupLoading = this.groupStoreService.group.loading.getLoading();
        console.log(urlId)
    }

    async toggleFollow(newIsFollowing: boolean): Promise<void> {
        if (newIsFollowing) {
            console.log('follow')
            this.isFollowing.set(true);
            // await this.profileCounterService.followProfile();
        } else {
            console.log('unfollow')
            this.isFollowing.set(false);
            // await this.profileCounterService.unFollowProfile();
        }
    }
}
