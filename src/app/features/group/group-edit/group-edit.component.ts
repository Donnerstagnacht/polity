import {Component, inject} from '@angular/core';
import {LinkCardComponent} from '../../../ui/cards/link-card/link-card.component';
import {GroupStore} from '../store/group.store.';

@Component({
    selector: 'polity-group-edit',
    standalone: true,
    imports: [
        LinkCardComponent
    ],
    templateUrl: './group-edit.component.html',
    styleUrl: './group-edit.component.less'
})
export class GroupEditComponent {
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
