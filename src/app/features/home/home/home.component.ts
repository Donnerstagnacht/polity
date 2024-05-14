import {Component, signal, WritableSignal} from '@angular/core';
import {SessionStoreService} from "../../../auth/services/session.store.service";
import {ProfileActionService} from "../../profile/action-store-services/profile.action.service";
import {ProfileStoreService} from "../../profile/action-store-services/profile.store.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ProfileLinkCardComponent} from "../../../ui/profile-link-card/profile-link-card.component";
import {GroupActionService} from "../../group/action-store-service/group.action.service";
import {GroupLinkCardComponent} from "../../../ui/group-link-card/group-link-card.component";

@Component({
    selector: 'polity-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less'],
    standalone: true,
    imports: [
        ProfileLinkCardComponent,
        GroupLinkCardComponent
    ]
})
export class HomeComponent {
    protected sessionId: string | null;

    protected isProfileLoading: WritableSignal<boolean> = signal(true)
    protected profile: WritableSignal<SupabaseObjectReturn<'read_user'> | null> = signal(null)

    protected areGroupsLoading: WritableSignal<boolean> = signal(true)
    protected groupsOfUser: WritableSignal<SupabaseObjectReturn<'read_groups_of_user'>[] | null> = signal(null)

    constructor(
        private readonly sessionStoreService: SessionStoreService,
        private readonly groupActionService: GroupActionService,
        private readonly profileService: ProfileActionService,
        private readonly profileStoreService: ProfileStoreService
    ) {
        this.isProfileLoading = this.profileStoreService.profile.loading.getLoading();
        this.areGroupsLoading = this.profileStoreService.groupsOfUser.loading.getLoading();

        this.sessionId = this.sessionStoreService.getSessionId();
    }

    async ngOnInit(): Promise<void> {
        Promise.all([
            this.profileService.readProfile(this.sessionId as string),
            this.groupActionService.readGroupsOfUser()
        ])
        this.profile = this.profileStoreService.profile.getObject()
        this.groupsOfUser = this.profileStoreService.groupsOfUser.getObjects()
    }

    onDestroy(): void {
        this.profileStoreService.profile.resetObject()
        this.profileStoreService.groupsOfUser.resetObjects()
    }
}
