import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NAVIGATION_ITEMS_PROFILE} from '../profile-navigation-signed-in';
import {NAVIGATION_ITEMS_PROFILE_OWNER} from '../profile-navigation-owner';
import {ProfileStore} from '../state/profile.store';
import {SessionStore} from '../../../auth/state/session.store';
import {SecondBarTopComponent} from '@polity-navigation/second-bar/second-bar-top/second-bar-top.component';
import {SecondBarRightComponent} from '@polity-navigation/second-bar/second-bar-right/second-bar-right.component';
import {NavigationItem} from '@polity-navigation/types-and-interfaces/navigationItem';
import {ProfileFollowStore} from '@polity-profile/profile-follow-state/profile-follow-store.service';
import {ProfileCounterStore} from '@polity-profile/profile-follow-state/profile-counter.store';

@Component({
    selector: 'polity-profile',
    templateUrl: './profile.router.html',
    styleUrls: ['./profile.router.less'],
    imports: [
        SecondBarTopComponent,
        RouterOutlet,
        SecondBarRightComponent,
        CommonModule
    ],
    standalone: true
})
export class ProfileRouter {
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
