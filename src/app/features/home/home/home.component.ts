import {Component, inject, signal} from '@angular/core';
import {ProfileLinkCardComponent} from '../../../ui/cards/profile-link-card/profile-link-card.component';
import {GroupLinkCardComponent} from '../../../ui/cards/group-link-card/group-link-card.component';
import {MembershipsOfUserStore} from '../../profile-groups/store/memberships-of-user.store';
import {ProfileStore} from '../../profile/store/profile.store';
import {SessionStore} from '../../../auth/store/session.store';

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

    protected readonly signal = signal;

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
