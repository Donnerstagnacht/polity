import {Routes} from '@angular/router';
import {ProfileWikiComponent} from "./profile-wiki/profile-wiki.component";
import {ProfileEditComponent} from "./profile-edit/profile-edit.component";
import {ProfileFollowEditComponent} from "../profile-follow/profile-follow-edit/profile-follow-edit.component";
import {isOwnerGuard} from "./is-owner.guard";

export const PROFILE_ROUTES: Routes = [
    {
        path: '',
        component: ProfileWikiComponent
    },
    {
        path: 'follower/edit',
        component: ProfileFollowEditComponent,
        canActivate: [isOwnerGuard]
    },
    {
        path: 'edit',
        component: ProfileEditComponent,
        canActivate: [isOwnerGuard]
    },
];
