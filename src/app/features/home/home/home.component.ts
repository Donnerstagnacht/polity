import {Component, signal, WritableSignal} from '@angular/core';
import {SessionStoreService} from "../../../core/services/session-store.service";
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
    protected isProfileLoading: WritableSignal<boolean> = signal(true)

    constructor(
        private readonly sessionStoreService: SessionStoreService,
        private readonly profileService: ProfileService,
        private readonly profileStoreService: ProfileStoreService
    ) {
        this.isProfileLoading = this.profileStoreService.profile.loading.getLoading();
        this.sessionId = this.sessionStoreService.getSessionId();
    }

    async ngOnInit(): Promise<void> {
        await this.profileService.selectProfile(this.sessionId as string)
        this.profile = this.profileStoreService.profile.getEntity()
    }

    onDestroy(): void {
        this.profileStoreService.profile.resetEntity()
    }
}