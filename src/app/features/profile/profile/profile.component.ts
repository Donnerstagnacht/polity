import {Component} from '@angular/core';
import {SessionStoreService} from "../../../auth/services/session.store.service";
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {NavigationItem} from "../../../navigation/types-and-interfaces/navigationItem";
import {SecondBarTopComponent} from "../../../navigation/second-bar-top/second-bar-top.component";
import {SecondBarRightComponent} from "../../../navigation/second-bar-right/second-bar-right.component";
import {CommonModule} from "@angular/common";
import {ProfileStoreService} from "../action-store-services/profile.store.service";
import {ProfileActionService} from "../action-store-services/profile.action.service";
import {ProfileCountersStoreService} from "../../profile-follow/action-store-services/profile-counters.store.service";
import {ProfileCountersActionService} from "../../profile-follow/action-store-services/profile-counters.action.service";
import {NAVIGATION_ITEMS_PROFILE} from "../profile-navigation-signed-in";
import {NAVIGATION_ITEMS_PROFILE_OWNER} from "../profile-navigation-owner";

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
    protected menuItemsProfile: NavigationItem[] = NAVIGATION_ITEMS_PROFILE;

    constructor(
        private readonly sessionStoreService: SessionStoreService,
        private readonly profileStoreService: ProfileStoreService,
        private readonly profileService: ProfileActionService,
        private route: ActivatedRoute,
        private readonly profileCounterService: ProfileCountersActionService,
        private readonly profileCountersStoreService: ProfileCountersStoreService
    ) {
    }

    async ngOnInit(): Promise<void> {
        const urlId: string = this.route.snapshot.params['id'];
        const sessionId: string | null = this.sessionStoreService.getSessionId();
        this.checkIsOwner(urlId, sessionId)

        await Promise.all([
            this.profileService.selectProfile(urlId),
            this.profileCounterService.selectProfileCounter(urlId)
        ])
        await this.profileCounterService.checkIfFollowing();
    }

    ngOnDestroy(): void {
        this.profileStoreService.profile.resetObject();
        this.profileCountersStoreService.profileCounters.resetObject()
    }

    private checkIsOwner(urlId: string, sessionId: string | null): void {
        if (sessionId == urlId) {
            this.profileStoreService.profile.uiFlagStore.setUiFlagTrue('isOwner')
            this.menuItemsProfile = NAVIGATION_ITEMS_PROFILE_OWNER;
            this.menuItemsProfile[0].link = '/profile/' + urlId
            this.menuItemsProfile[1].link = '/profile/' + urlId + '/edit'
            this.menuItemsProfile[2].link = '/profile/' + urlId + '/follower/edit'
        } else {
            this.profileStoreService.profile.uiFlagStore.setUiFlagFalse('isOwner')
            this.menuItemsProfile = NAVIGATION_ITEMS_PROFILE;
            this.menuItemsProfile[0].link = '/profile/' + urlId
        }
    }
}
