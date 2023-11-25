import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile/profile.component';
import {ProfileWikiComponent} from './profile-wiki/profile-wiki.component';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TuiFieldErrorPipeModule, TuiInputFilesModule, TuiInputModule} from "@taiga-ui/kit";
import {
    TuiButtonModule,
    TuiErrorModule,
    TuiNotificationModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {ProfileImageUploadComponent} from './profile-image-upload/profile-image-upload.component';
import {ProfileFollowModule} from "../profile-follow/profile-follow.module";
import {FollowButton} from "../../ui/polity-wiki/follow-button/follow-button.component";
import {CounterComponent} from "../../ui/polity-wiki/counter/counter.component";
import {WikiHeadlineComponent} from "../../ui/polity-wiki/wiki-headline/wiki-headline.component";
import {WikiImageComponent} from "../../ui/polity-wiki/wiki-image/wiki-image.component";
import {SecondBarRightComponent} from "../../navigation/second-bar-right/second-bar-right.component";
import {SecondBarTopComponent} from "../../navigation/second-bar-top/second-bar-top.component";
import {SignOutComponent} from "../../auth/sign-out/sign-out.component";
import {AssistantToggleComponent} from "../assistant/assistant-toggle/assistant-toggle.component";

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileWikiComponent,
        ProfileEditComponent,
        ProfileImageUploadComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiButtonModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiSvgModule,
        TuiTextfieldControllerModule,
        TuiNotificationModule,
        TuiInputFilesModule,
        ProfileFollowModule,
        FollowButton,
        CounterComponent,
        WikiHeadlineComponent,
        WikiImageComponent,
        SecondBarRightComponent,
        SecondBarTopComponent,
        SignOutComponent,
        AssistantToggleComponent
    ]
})
export class ProfileModule {
}
