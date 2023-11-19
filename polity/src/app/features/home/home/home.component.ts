import {Component, signal, WritableSignal} from '@angular/core';
import {SessionStoreService} from "../../../core/services/session-store.service";
import {UiStoreService} from "../../../core/services/ui-store.service";
import {Profile} from "../../profile/types-and-interfaces/profile";
import {ProfileService} from "../../profile/services/profile.service";
import {ProfileStoreService} from "../../profile/services/profile-store.service";

@Component({
    selector: 'polity-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent {
    protected sessionId: string | null;
    protected profile: WritableSignal<Profile | null> = signal(null)

    constructor(
        private readonly sessionStoreService: SessionStoreService,
        private readonly UIStoreService: UiStoreService,
        private readonly profileService: ProfileService,
        private readonly profileStoreService: ProfileStoreService
    ) {
        this.UIStoreService.setLoading(true);
        this.sessionId = this.sessionStoreService.sessionId();
        this.profileService.selectProfile(this.sessionId as string)
        this.UIStoreService.setLoading(false)
    }

    ngOnInit(): void {
        this.profile = this.profileStoreService.profile.selectEntity()
    }

    onDestroy(): void {
        this.profileStoreService.profile.resetEntity()
    }
}
