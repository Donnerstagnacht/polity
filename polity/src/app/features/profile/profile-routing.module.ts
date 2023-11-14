import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileWikiComponent} from "./profile-wiki/profile-wiki.component";
import {ProfileEditComponent} from "./profile-edit/profile-edit.component";
import {ProfileFollowEditComponent} from "../profile-follow/profile-follow-edit/profile-follow-edit.component";
import {isOwnerGuard} from "./is-owner.guard";

const routes: Routes = [
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
    {
        path: '',
        component: ProfileWikiComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {
}
