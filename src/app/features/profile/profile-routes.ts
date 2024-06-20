import {Routes} from '@angular/router';
import {isOwnerGuard} from './is-owner.guard';

import {ProfileEditPage} from '@polity-profile/profile-edit-page/profile-edit.page';
import {ProfileWikiPage} from '@polity-profile/profile-wiki-page/profile-wiki.page';
import {ProfileFollowEditPage} from '@polity-profile/profile-follow-edit-page/profile-follow-edit.page';
import {ProfileGroupsEditPage} from '@polity-profile/profile-groups-edit-page/profile-groups-edit.page';

export const PROFILE_ROUTES: Routes = [
    {
        path: '',
        component: ProfileWikiPage
    },
    {
        path: 'follower/edit',
        component: ProfileFollowEditPage,
        canActivate: [isOwnerGuard]
    },
    {
        path: 'groups/edit',
        component: ProfileGroupsEditPage,
        canActivate: [isOwnerGuard]
    },
    {
        path: 'edit',
        component: ProfileEditPage,
        canActivate: [isOwnerGuard]
    }
];
