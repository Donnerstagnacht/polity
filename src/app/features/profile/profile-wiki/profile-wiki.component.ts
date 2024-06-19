import {Component, inject, signal} from '@angular/core';
import {WikiHeadlineComponent} from '../../../ui/polity-wiki/wiki-headline/wiki-headline.component';
import {CounterComponent} from '../../../ui/polity-wiki/counter/counter.component';
import {FollowButton} from '../../../ui/polity-wiki/follow-button/follow-button.component';
import {WikiImageComponent} from '../../../ui/polity-wiki/wiki-image/wiki-image.component';
import {ProfileCounterStore} from '../../profile-follow/store/profile-counter.store';
import {ProfileFollowStore} from '../../profile-follow/store/profile-follow-store.service';
import {ProfileStore} from '../store/profile.store';

@Component({
    selector: 'polity-profile-wiki',
    templateUrl: './profile-wiki.component.html',
    styleUrls: ['./profile-wiki.component.less'],
    standalone: true,
    imports: [
        WikiHeadlineComponent,
        CounterComponent,
        FollowButton,
        WikiImageComponent
    ]
})
export class ProfileWikiComponent {
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
