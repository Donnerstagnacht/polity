import {Component, signal, WritableSignal} from '@angular/core';
import {SessionStoreService} from "../../../auth/services/session-store.service";
import {Profile} from "../../profile/types-and-interfaces/profile";
import {ProfileService} from "../../profile/services/profile.service";
import {ProfileStoreService} from "../../profile/services/profile-store.service";
import {LinkCardComponent} from "../../../ui/link-card/link-card.component";

@Component({
    selector: 'polity-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less'],
    standalone: true,
    imports: [
        LinkCardComponent

    ]
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
        this.profile = this.profileStoreService.profile.getObject()
    }

    onDestroy(): void {
        this.profileStoreService.profile.resetObject()
    }
}
