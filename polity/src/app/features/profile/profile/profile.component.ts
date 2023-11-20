import {Component} from '@angular/core';
import {SessionStoreService} from "../../../core/services/session-store.service";
import {ProfileService} from "../services/profile.service";
import {ProfileStoreService} from "../services/profile-store.service";
import {ActivatedRoute} from "@angular/router";
import {menuItemsProfile, menuItemsProfileOwner} from "../../../layout/menu-items";
import {Item} from "../../../layout/types-and-interfaces/item";
import {ProfileFollowService} from "../../profile-follow/services/profile-follow.service";
import {ProfileStatisticsStoreService} from "../../profile-follow/services/profile-statistics-store.service";

@Component({
    selector: 'polity-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less']
})
export class ProfileComponent {
    protected menuItemsProfile: Item[] = menuItemsProfile;

    constructor(
        private readonly sessionStoreService: SessionStoreService,
        private readonly profileStoreService: ProfileStoreService,
        private readonly profileService: ProfileService,
        private route: ActivatedRoute,
        private readonly profileFollowService: ProfileFollowService,
        private readonly profileStatisticsStoreService: ProfileStatisticsStoreService,
    ) {
    }


    async ngOnInit(): Promise<void> {
        const urlId: string = this.route.snapshot.params['id'];
        const sessionId: string | null = this.sessionStoreService.getSessionId();
        this.checkIsOwner(urlId, sessionId)

        await Promise.all([
            this.profileService.selectProfile(urlId),
            this.profileFollowService.selectProfileStatistics(urlId),
        ])
        await this.profileFollowService.checkIfFollowing();
    }

    ngOnDestroy(): void {
        this.profileStoreService.profile.resetEntity();
        this.profileStatisticsStoreService.profileStatistics.resetEntity()
    }

    private checkIsOwner(urlId: string, sessionId: string | null): void {
        if (sessionId == urlId) {
            this.profileStoreService.setAsOwner()
            this.menuItemsProfile = menuItemsProfileOwner;
            this.menuItemsProfile[0].link = '/profile/' + urlId
            this.menuItemsProfile[1].link = '/profile/' + urlId + '/edit'
            this.menuItemsProfile[2].link = '/profile/' + urlId + '/follower/edit'
        } else {
            this.profileStoreService.setNotAsOwner()
            this.menuItemsProfile = menuItemsProfile;
            this.menuItemsProfile[0].link = '/profile/' + urlId
        }
    }
}
