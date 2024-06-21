import {Component, inject, signal} from '@angular/core';
import {ProfileStore} from '../state/profile.store';
import {WikiHeadlineComponent} from '@polity-ui/polity-wiki/wiki-headline/wiki-headline.component';
import {CounterComponent} from '@polity-ui/polity-wiki/counter/counter.component';
import {FollowButton} from '@polity-ui/polity-wiki/follow-button/follow-button.component';
import {WikiImageComponent} from '@polity-ui/polity-wiki/wiki-image/wiki-image.component';
import {ProfileFollowStore} from '@polity-profile/profile-follow-state/profile-follow-store.service';
import {ProfileCounterStore} from '@polity-profile/profile-follow-state/profile-counter.store';

@Component({
    selector: 'polity-profile-wiki',
    templateUrl: './profile-wiki.page.html',
    styleUrls: ['./profile-wiki.page.less'],
    standalone: true,
    imports: [
        WikiHeadlineComponent,
        CounterComponent,
        FollowButton,
        WikiImageComponent
    ]
})
export class ProfileWikiPage {
    protected profileFollowStore: ProfileFollowStore = inject(ProfileFollowStore);
    protected profileCounterStore: ProfileCounterStore = inject(ProfileCounterStore);
    protected profileStore: ProfileStore = inject(ProfileStore);

    protected readonly signal = signal;

    async toggleFollow(newIsFollowing: boolean): Promise<void> {
        if (newIsFollowing) {
            await this.profileFollowStore.follow();
        } else {
            await this.profileFollowStore.unfollow();
        }
    }
}
