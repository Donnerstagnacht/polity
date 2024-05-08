import {Component, WritableSignal} from '@angular/core';
import {LinkCardComponent} from "../../../ui/link-card/link-card.component";
import {GroupStoreService} from "../action-store-service/group.store.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";

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
    protected editGroupUrl: string = '';
    protected editGroupFollowerUrl: string = '';
    protected editGroupMemberUrl: string = '';

    constructor(
        private readonly groupStoreService: GroupStoreService
    ) {
    }

    ngOnInit(): void {
        const group: WritableSignal<SupabaseObjectReturn<'read_group_columns'> | null> = this.groupStoreService.group.getObject()
        const urlId: string | undefined = group()?.id
        this.editGroupUrl = 'group/' + urlId + '/settings/edit';
        this.editGroupMemberUrl = 'group/' + urlId + '/member/edit';
        this.editGroupFollowerUrl = 'group/' + urlId + '/follower/edit';
    }

}
