import {Component, inject} from '@angular/core';
import {ProfileLinkCardComponent} from '@polity-ui/polity-cards/profile-link-card/profile-link-card.component';
import {GroupLinkCardComponent} from '@polity-ui/polity-cards/group-link-card/group-link-card.component';
import {ProfileStore} from '../../profile/state/profile.store';
import {SessionStore} from '../../../auth/state/session.store';
import {MembershipsOfUserStore} from '@polity-profile/profile-groups-state/memberships-of-user.store';

@Component({
    selector: 'polity-home',
    templateUrl: './home-router.component.html',
    styleUrls: ['./home-router.component.less'],
    standalone: true,
    imports: [
        ProfileLinkCardComponent,
        GroupLinkCardComponent
    ],
    providers: [
        MembershipsOfUserStore,
        ProfileStore
    ]
})
export class HomeRouter {
    protected profileStore: ProfileStore = inject(ProfileStore);
    protected sessionStore: SessionStore = inject(SessionStore);
    protected membershipsOfUserStore: MembershipsOfUserStore = inject(MembershipsOfUserStore);
    protected sessionId: string | null;

    constructor() {
        this.sessionId = this.sessionStore.getSessionId();
    }

    async ngOnInit(): Promise<void> {
        Promise.all([
            this.profileStore.read(this.sessionId as string),
            this.membershipsOfUserStore.read()
        ]);
    }
}
