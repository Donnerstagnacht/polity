import {Component, inject} from '@angular/core';
import {LinkCardComponent} from '@polity-ui/polity-cards/link-card/link-card.component';
import {GroupStore} from '../state/group.store.';
import {IconLinkCardComponent} from '@polity-ui/polity-cards/icon-link-card/icon-link-card.component';
import {TuiIconModule} from '@taiga-ui/experimental';

@Component({
    selector: 'polity-group-overview-edit',
    standalone: true,
    imports: [
        LinkCardComponent,
        IconLinkCardComponent,
        TuiIconModule
    ],
    templateUrl: './group-edit-overview.page.html',
    styleUrl: './group-edit-overview.page.less'
})
export class GroupEditOverviewPage {
    groupStore: GroupStore = inject(GroupStore);
    protected editGroupUrl: string = '';
    protected editGroupFollowerUrl: string = '';
    protected editGroupMemberUrl: string = '';

    ngOnInit(): void {
        const urlId: string | undefined = this.groupStore.data().id_;
        this.editGroupUrl = 'group/' + urlId + '/settings/edit';
        this.editGroupMemberUrl = 'group/' + urlId + '/member/edit';
        this.editGroupFollowerUrl = 'group/' + urlId + '/follower/edit';
    }
}
