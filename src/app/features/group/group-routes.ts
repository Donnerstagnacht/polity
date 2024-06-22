import {Routes} from '@angular/router';
import {isBoardMemberGuard} from './is-board-member.guard';
import {GroupWikiPage} from '@polity-group/group-wiki-page/group-wiki.page';
import {GroupFollowEditPage} from '@polity-group/group-follow-edit-page/group-follow-edit.page';
import {GroupMemberEditPage} from '@polity-group/group-member-edit-page/group-member-edit.page';
import {GroupEditOverviewPage} from '@polity-group/group-edit-overview-page/group-edit-overview.page';
import {GroupEditPage} from '@polity-group/group-edit-page/group-edit.page';

export const GROUP_ROUTES: Routes = [
    {
        path: '',
        component: GroupWikiPage
    },
    {
        path: 'edit',
        component: GroupEditOverviewPage,
        canActivate: [isBoardMemberGuard]
    },
    {
        path: 'follower/edit',
        component: GroupFollowEditPage,
        canActivate: [isBoardMemberGuard]
    },
    {
        path: 'member/edit',
        component: GroupMemberEditPage,
        canActivate: [isBoardMemberGuard]
    },
    {
        path: 'settings/edit',
        component: GroupEditPage,
        canActivate: [isBoardMemberGuard]
    }
];
