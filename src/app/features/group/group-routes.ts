import {Routes} from "@angular/router";
import {GroupNewComponent} from "./group-new/group-new.component";
import {GroupWikiComponent} from "./group-wiki/group-wiki.component";
import {GroupEditComponent} from "./group-edit/group-edit.component";
import {GroupFollowEditComponent} from "../group-follow/group-follow-edit/group-follow-edit.component";
import {GroupMemberEditComponent} from "../group_member/group-member-edit/group-member-edit.component";

export const GROUP_ROUTES: Routes = [
    {
        path: '',
        component: GroupWikiComponent
    },
    {
        path: 'edit',
        component: GroupEditComponent
    },
    {
        path: 'follower/edit',
        component: GroupFollowEditComponent
    },
    {
        path: 'member/edit',
        component: GroupMemberEditComponent
    },
    {
        path: 'new',
        component: GroupNewComponent
    }
]
