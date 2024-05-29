import {Component, signal, WritableSignal} from '@angular/core';
import {SessionStoreService} from "../../../auth/services/session.store.service";
import {ProfileActionService} from "../../profile/action-store-services/profile.action.service";
import {ProfileStoreService} from "../../profile/action-store-services/profile.store.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {ProfileLinkCardComponent} from "../../../ui/cards/profile-link-card/profile-link-card.component";
import {GroupLinkCardComponent} from "../../../ui/cards/group-link-card/group-link-card.component";
import {GroupsOfUserStoreService} from "../../profile-groups/action-store-services/groups-of-user.store.service";
import {GroupsOfUserActionService} from "../../profile-groups/action-store-services/groups-of-user.action.service";

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
    protected profile: WritableSignal<SupabaseObjectReturn<'read_profile'> | null> = signal(null)

    protected areGroupsLoading: WritableSignal<boolean> = signal(true)
    protected groupsOfUser: WritableSignal<SupabaseObjectReturn<'read_groups_of_user'>[] | null> = signal(null)

    constructor(
        private readonly sessionStoreService: SessionStoreService,
        private readonly profileService: ProfileActionService,
        private readonly profileStoreService: ProfileStoreService,
        private readonly groupsOfUserStoreService: GroupsOfUserStoreService,
        private readonly groupsOfUserActionService: GroupsOfUserActionService
    ) {
        this.isProfileLoading = this.profileStoreService.profile.loading.getLoading();
        this.areGroupsLoading = this.groupsOfUserStoreService.groupsOfUser.loading.getLoading();

        this.sessionId = this.sessionStoreService.getSessionId();
    }

    async ngOnInit(): Promise<void> {
        Promise.all([
            this.profileService.readProfile(this.sessionId as string),
            this.groupsOfUserActionService.readGroupsOfUser()
        ])
        this.profile = this.profileStoreService.profile.getObject()
        this.groupsOfUser = this.groupsOfUserStoreService.groupsOfUser.getObjects()
    }

    onDestroy(): void {
        this.profileStoreService.profile.resetObject()
        this.groupsOfUserStoreService.groupsOfUser.resetObjects()
    }
}
