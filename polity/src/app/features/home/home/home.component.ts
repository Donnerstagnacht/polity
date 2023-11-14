import {Component, signal, WritableSignal} from '@angular/core';
import {Session} from "@supabase/supabase-js";
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
    protected auth: WritableSignal<Session | null> = signal(null)
    protected profile: WritableSignal<Profile | null> = signal(null)

    constructor(
        private readonly sessionStoreService: SessionStoreService,
        private readonly UIStoreService: UiStoreService,
        private readonly profileService: ProfileService,
        private readonly profileStoreService: ProfileStoreService
    ) {
        this.UIStoreService.setLoading(true)
        this.auth = this.sessionStoreService.selectSession();
        this.profileService.selectProfile(this.auth()?.user?.id as string);
        this.UIStoreService.setLoading(false)
    }

    ngOnInit(): void {
        this.profile = this.profileStoreService.selectProfile();
    }
}
