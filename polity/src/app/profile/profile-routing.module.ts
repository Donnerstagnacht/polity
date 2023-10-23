import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as path from "path";
import {ProfileComponent} from "./profile/profile.component";
import {isSignedInGuard} from "../core/is-signed-in.guard";

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [isSignedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
