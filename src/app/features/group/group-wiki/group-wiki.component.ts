import {Component, effect, inject, Inject, Injector, signal} from '@angular/core';
import {CounterComponent} from '../../../ui/polity-wiki/counter/counter.component';
import {FollowButton} from '../../../ui/polity-wiki/follow-button/follow-button.component';
import {RequestButton} from '../../../ui/polity-wiki/request-button/request-button.component';
import {WikiHeadlineComponent} from '../../../ui/polity-wiki/wiki-headline/wiki-headline.component';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {
    GroupAcceptDeclineMembershipComponent
} from '../../group_member/group-accept-decline-membership/group-accept-decline-membership.component';
import {GroupCounterStore} from '../../group-follow/state/group-counter.store';
import {GroupFollowStore} from '../../group-follow/state/group-follow.store';
import {GroupStore} from '../state/group.store.';
import {GroupMembershipStatusStore} from '../../group_member/state/group-membership-status.store';
import {GroupRequestsStore} from '../../group_member/state/group-requests.store';
import {GroupInvitationsStore} from '../../group_member/state/group-invitations.store';
import {GroupMembersStore} from '../../group_member/state/group-members.store';

@Component({
    selector: 'polity-group-wiki',
    standalone: true,
    imports: [
        CounterComponent,
        FollowButton,
        RequestButton,
        WikiHeadlineComponent
    ],
    templateUrl: './group-wiki.component.html',
    styleUrl: './group-wiki.component.less'
})
export class GroupWikiComponent {
    protected groupStore: GroupStore = inject(GroupStore);
    protected groupCounterStore: GroupCounterStore = inject(GroupCounterStore);
    protected groupFollowStore: GroupFollowStore = inject(GroupFollowStore);
    protected groupInvitationsStore: GroupInvitationsStore = inject(GroupInvitationsStore);
    protected groupMembershipStatusStore: GroupMembershipStatusStore = inject(GroupMembershipStatusStore);
    protected groupRequestsStore: GroupRequestsStore = inject(GroupRequestsStore);
    protected groupMembersStore: GroupMembersStore = inject(GroupMembersStore);

    protected buttonTextString: string = 'Request Membership';
    protected readonly signal = signal;
    private readonly dialog = this.dialogService.open<string>(
        new PolymorpheusComponent(GroupAcceptDeclineMembershipComponent, this.injector),
        {
            dismissible: true,
            label: 'Heading'
        }
    );

    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private injector: Injector
    ) {
        effect((): void => {
            if (this.groupMembershipStatusStore.isNoMember()) {
                this.buttonTextString = 'Request Membership';
            } else if (this.groupMembershipStatusStore.isMember() || this.groupMembershipStatusStore.isBoardMember()) {
                this.buttonTextString = 'Leave Group';
            } else if (this.groupMembershipStatusStore.isRequested()) {
                this.buttonTextString = 'Withdraw request';
            } else if (this.groupMembershipStatusStore.isInvited()) {
                this.buttonTextString = 'Answer invitation';
            }

        });

    }

    async toggleFollow(newIsFollowing: boolean): Promise<void> {
        if (newIsFollowing) {
            await this.groupFollowStore.follow();
        } else {
            await this.groupFollowStore.unFollow();
        }
    }

    async toggleMembership(newIsMember: boolean): Promise<void> {
        if (this.groupMembershipStatusStore.isNoMember()) {
            await this.groupRequestsStore.request();
        } else if (this.groupMembershipStatusStore.isMember() || this.groupMembershipStatusStore.isBoardMember()) {
            await this.groupMembersStore.leave();
        } else if (this.groupMembershipStatusStore.isRequested()) {
            await this.groupRequestsStore.withdraw();
        } else if (this.groupMembershipStatusStore.isInvited()) {
            this.showDialog();
            //TODO open dialog
            //TODO check if accepted
            // await this.groupMemberActionService.accceptGroupInvitation();
            //TODO check if not accepted
            // await this.groupMemberActionService.declineGroupInvitation();

        }
    }

    private showDialog(): void {
        this.dialog.subscribe({
            next: data => {
                console.info(`Dialog emitted data = ${data}`);
                if (data === 'accept') {
                    this.groupInvitationsStore.accept();
                } else if (data === 'decline') {
                    this.groupInvitationsStore.decline();
                }
            },
            complete: () => {
                console.info('Dialog closed');
            }
        });
    }
}
