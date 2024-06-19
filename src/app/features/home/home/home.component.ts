import {Component, inject, signal} from '@angular/core';
import {ProfileLinkCardComponent} from '../../../ui/cards/profile-link-card/profile-link-card.component';
import {GroupLinkCardComponent} from '../../../ui/cards/group-link-card/group-link-card.component';
import {MembershipsOfUserStore} from '../../profile-groups/store/memberships-of-user.store';
import {ProfileStore} from '../../profile/store/profile.store';
import {SessionStore} from '../../../auth/services/session.store';

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
    protected profileStore: ProfileStore = inject(ProfileStore);
    protected sessionStore: SessionStore = inject(SessionStore);
    protected membershipsOfUserStore: MembershipsOfUserStore = inject(MembershipsOfUserStore);
    protected sessionId: string | null;

    // protected isProfileLoading: WritableSignal<boolean> = signal(true);
    // protected profile: WritableSignal<SupabaseObjectReturn<'read_profile'> | null> = signal(null);

    // protected areGroupsLoading: WritableSignal<boolean> = signal(true)
    // protected groupsOfUser: WritableSignal<SupabaseObjectReturn<'read_groups_of_user'>[] | null> = signal(null)
    protected readonly signal = signal;

    constructor(
        // private readonly sessionStoreService: SessionStoreService,
        // private readonly profileService: ProfileActionService,
        // private readonly profileStoreService: ProfileStoreService
        // private readonly groupsOfUserStoreService: GroupsOfUserStoreService,
        // private readonly groupsOfUserActionService: GroupsOfUserActionService
    ) {
        // this.isProfileLoading = this.profileStoreService.profile.loading.getLoading();
        // this.areGroupsLoading = this.groupsOfUserStoreService.groupsOfUser.loading.getLoading();

        this.sessionId = this.sessionStore.getSessionId();
    }

    async ngOnInit(): Promise<void> {
        Promise.all([
            this.profileStore.read(this.sessionId as string),
            // this.profileService.readProfile(this.sessionId as string),
            this.membershipsOfUserStore.read()
            // this.groupsOfUserActionService.readGroupsOfUser()
        ]);
        // this.profile = this.profileStoreService.profile.getObject();
        // this.groupsOfUser = this.groupsOfUserStoreService.groupsOfUser.getObjects()
    }

    onDestroy(): void {
        // this.profileStoreService.profile.resetObject();
        this.membershipsOfUserStore.resetState();
        // this.groupsOfUserStoreService.groupsOfUser.resetObjects()
    }
}
