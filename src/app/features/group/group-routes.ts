import {Routes} from "@angular/router";
import {GroupWikiComponent} from "./group-wiki/group-wiki.component";
import {GroupEditComponent} from "./group-edit/group-edit.component";
import {GroupFollowEditComponent} from "../group-follow/group-follow-edit/group-follow-edit.component";
import {GroupMemberEditComponent} from "../group_member/group-member-edit/group-member-edit.component";
import {GroupEditSettingsComponent} from "./group-edit-settings/group-edit-settings.component";

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
        path: 'settings/edit',
        component: GroupEditSettingsComponent
    }
]
