import {Routes} from "@angular/router";
import {GroupWikiComponent} from "./group-wiki/group-wiki.component";
import {GroupEditComponent} from "./group-edit/group-edit.component";
import {GroupFollowEditComponent} from "../group-follow/group-follow-edit/group-follow-edit.component";
import {GroupMemberEditComponent} from "../group_member/group-member-edit/group-member-edit.component";
import {GroupEditSettingsComponent} from "./group-edit-settings/group-edit-settings.component";
import {isBoardMemberGuard} from "./is-board-member.guard";

export const GROUP_ROUTES: Routes = [
    {
        path: '',
        component: GroupWikiComponent
    },
    {
        path: 'edit',
        component: GroupEditComponent,
        canActivate: [isBoardMemberGuard]
    },
    {
        path: 'follower/edit',
        component: GroupFollowEditComponent,
        canActivate: [isBoardMemberGuard]
    },
    {
        path: 'member/edit',
        component: GroupMemberEditComponent,
        canActivate: [isBoardMemberGuard]
    },
    {
        path: 'settings/edit',
        component: GroupEditSettingsComponent,
        canActivate: [isBoardMemberGuard]
    }
]
