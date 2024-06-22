import {Component, inject} from '@angular/core';
import {LinkCardComponent} from '@polity-ui/polity-cards/link-card/link-card.component';
import {GroupStore} from '../state/group.store.';
import {IconLinkCardComponent} from '@polity-ui/polity-cards/icon-link-card/icon-link-card.component';
import {tuiIconHeartLarge} from '@taiga-ui/icons';
import {TuiIconModule} from '@taiga-ui/experimental';

@Component({
    selector: 'polity-group-edit',
    standalone: true,
    imports: [
        LinkCardComponent,
        IconLinkCardComponent,
        TuiIconModule
    ],
    templateUrl: './group-edit.page.html',
    styleUrl: './group-edit.page.less'
})
export class GroupEditPage {
    groupStore: GroupStore = inject(GroupStore);
    protected editGroupUrl: string = '';
    protected editGroupFollowerUrl: string = '';
    protected editGroupMemberUrl: string = '';
    protected readonly tuiIconHeartLarge = tuiIconHeartLarge;

    ngOnInit(): void {
        const urlId: string | undefined = this.groupStore.data().id_;
        this.editGroupUrl = 'group/' + urlId + '/settings/edit';
        this.editGroupMemberUrl = 'group/' + urlId + '/member/edit';
        this.editGroupFollowerUrl = 'group/' + urlId + '/follower/edit';
    }
}
