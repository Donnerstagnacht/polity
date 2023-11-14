import {Component, WritableSignal} from '@angular/core';
import {AuthSession} from "@supabase/supabase-js";
import {SessionStoreService} from "../../../core/services/session-store.service";
import {ProfileService} from "../services/profile.service";
import {ProfileStoreService} from "../services/profile-store.service";
import {ActivatedRoute} from "@angular/router";
import {menuItemsProfile, menuItemsProfileOwner} from "../../../layout/menu-items";
import {Item} from "../../../layout/types-and-interfaces/item";
import {UiStoreService} from "../../../core/services/ui-store.service";
import {ProfileFollowService} from "../../profile-follow/services/profile-follow.service";

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
        private readonly userService: ProfileService,
        private route: ActivatedRoute,
        private readonly globalUiStateService: UiStoreService,
        private readonly profileFollowService: ProfileFollowService
    ) {
        this.profileStoreService.setProfile(null);
    }


    async ngOnInit(): Promise<void> {
        this.globalUiStateService.setLoading(true);

        const urlId: string = this.route.snapshot.params['id'];
        const session: WritableSignal<AuthSession | null> = this.sessionStoreService.selectSession();

        if (urlId == session()?.user?.id) {
            this.globalUiStateService.setIsOwner(true);
            this.menuItemsProfile = menuItemsProfileOwner;
            this.menuItemsProfile[0].link = '/profile/' + urlId
            this.menuItemsProfile[1].link = '/profile/' + urlId + '/edit'
            this.menuItemsProfile[2].link = '/profile/' + urlId + '/follower/edit'
        } else {
            this.globalUiStateService.setIsOwner(false);
            this.menuItemsProfile = menuItemsProfile;
            this.menuItemsProfile[0].link = '/profile/' + urlId
        }
        this.globalUiStateService.setLoading(false);

        await this.userService.selectProfile(urlId);
        await this.profileFollowService.selectProfileStatistics(urlId);
        await this.profileFollowService.checkIfFollowing();
    }
}
