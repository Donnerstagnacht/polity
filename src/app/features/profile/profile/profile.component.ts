import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {NavigationItem} from '../../../navigation/types-and-interfaces/navigationItem';
import {SecondBarTopComponent} from '../../../navigation/second-bar/second-bar-top/second-bar-top.component';
import {SecondBarRightComponent} from '../../../navigation/second-bar/second-bar-right/second-bar-right.component';
import {CommonModule} from '@angular/common';
import {NAVIGATION_ITEMS_PROFILE} from '../profile-navigation-signed-in';
import {NAVIGATION_ITEMS_PROFILE_OWNER} from '../profile-navigation-owner';
import {ProfileCounterStore} from '../../profile-follow/state/profile-counter.store';
import {ProfileStore} from '../state/profile.store';
import {ProfileFollowStore} from '../../profile-follow/state/profile-follow-store.service';
import {SessionStore} from '../../../auth/state/session.store';

@Component({
    selector: 'polity-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less'],
    imports: [
        SecondBarTopComponent,
        RouterOutlet,
        SecondBarRightComponent,
        CommonModule
    ],
    standalone: true
})
export class ProfileComponent {
    protected profileStore: ProfileStore = inject(ProfileStore);
    protected profileFollowStore: ProfileFollowStore = inject(ProfileFollowStore);
    protected sessionStore: SessionStore = inject(SessionStore);
    protected menuItemsProfile: NavigationItem[] = NAVIGATION_ITEMS_PROFILE;
    protected profileCounterStore: ProfileCounterStore = inject(ProfileCounterStore);

    constructor(
        private route: ActivatedRoute
    ) {
    }

    async ngOnInit(): Promise<void> {
        const urlId: string = this.route.snapshot.params['id'];
        const sessionId: string | null = this.sessionStore.getSessionId();
        this.checkIsOwner(urlId, sessionId);

        await Promise.all([
            this.profileStore.read(urlId),
            this.profileCounterStore.read(urlId)
        ]);
        await this.profileFollowStore.checkIfFollowing(urlId);
    }

    private checkIsOwner(urlId: string, sessionId: string | null): void {
        this.profileStore.checkIsOwner(urlId, sessionId);
        if (this.profileStore.isOwner()) {
            this.menuItemsProfile = NAVIGATION_ITEMS_PROFILE_OWNER;
            this.menuItemsProfile[0].link = '/profile/' + urlId;
            this.menuItemsProfile[1].link = '/profile/' + urlId + '/edit';
            this.menuItemsProfile[2].link = '/profile/' + urlId + '/groups/edit';
            this.menuItemsProfile[3].link = '/profile/' + urlId + '/follower/edit';
        } else {
            this.menuItemsProfile = NAVIGATION_ITEMS_PROFILE;
            this.menuItemsProfile[0].link = '/profile/' + urlId;
        }
    }
}
