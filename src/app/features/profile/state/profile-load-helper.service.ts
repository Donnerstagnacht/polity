import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {ProfileFollowStore} from '@polity-profile/profile-follow-state/profile-follow-store.service';
import {ProfileCounterStore} from '@polity-profile/profile-follow-state/profile-counter.store';
import {ProfileStore} from '@polity-profile/state/profile.store';
import {NAVIGATION_ITEMS_PROFILE_OWNER} from '@polity-profile/profile-navigation-owner';
import {NAVIGATION_ITEMS_PROFILE} from '@polity-profile/profile-navigation-signed-in';
import {NavigationItem} from '@polity-navigation/types-and-interfaces/navigationItem';
import {SessionStore} from '../../../auth/state/session.store';

@Injectable({
    providedIn: 'root'
})
export class ProfileLoadHelperService {
    private menuItemsProfile_: NavigationItem[] = NAVIGATION_ITEMS_PROFILE;
    public menuItemsProfile: WritableSignal<NavigationItem[]> = signal(this.menuItemsProfile_);
    private sessionStore: SessionStore = inject(SessionStore);
    private readonly profileStore: ProfileStore = inject(ProfileStore);
    private readonly profileCounterStore: ProfileCounterStore = inject(ProfileCounterStore);
    private readonly profileFollowStore: ProfileFollowStore = inject(ProfileFollowStore);

    public async loadData(urlId: string): Promise<void> {
        await Promise.all([
            this.checkIsOwner(urlId, this.sessionStore.getSessionId()),
            this.profileStore.read(urlId),
            this.profileCounterStore.read(urlId),
            this.profileFollowStore.checkIfFollowing(urlId)
        ]);
    }

    private checkIsOwner(urlId: string, sessionId: string | null): void {
        this.profileStore.checkIsOwner(urlId, sessionId);
        if (this.profileStore.isOwner()) {
            this.menuItemsProfile_ = NAVIGATION_ITEMS_PROFILE_OWNER;
            this.menuItemsProfile_[0].link = '/profile/' + urlId;
            this.menuItemsProfile_[1].link = '/profile/' + urlId + '/edit';
            this.menuItemsProfile_[2].link = '/profile/' + urlId + '/groups/edit';
            this.menuItemsProfile_[3].link = '/profile/' + urlId + '/follower/edit';
            this.menuItemsProfile.set(this.menuItemsProfile_);
        } else {
            this.menuItemsProfile_ = NAVIGATION_ITEMS_PROFILE;
            this.menuItemsProfile_[0].link = '/profile/' + urlId;
            this.menuItemsProfile.set(this.menuItemsProfile_);
        }
    }

}
