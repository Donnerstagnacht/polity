import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile/profile.component';
import {ProfileWikiComponent} from './profile-wiki/profile-wiki.component';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TuiFieldErrorPipeModule, TuiInputFilesModule, TuiInputModule, TuiInputPasswordModule} from "@taiga-ui/kit";
import {
    TuiButtonModule,
    TuiErrorModule,
    TuiHintModule,
    TuiLoaderModule,
    TuiNotificationModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {LayoutModule} from "../../layout/layout.module";
import {ProfileImageUploadComponent} from './profile-image-upload/profile-image-upload.component';
import {CoreModule} from "../../core/core.module";
import {SharedModule} from "../../shared/shared.module";
import {ProfileFollowModule} from "../profile-follow/profile-follow.module";

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileWikiComponent,
        ProfileEditComponent,
        ProfileImageUploadComponent
    ],
    exports: [
        ProfileComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiHintModule,
        TuiButtonModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiSvgModule,
        TuiInputPasswordModule,
        TuiTextfieldControllerModule,
        TuiNotificationModule,
        LayoutModule,
        TuiInputFilesModule,
        CoreModule,
        TuiLoaderModule,
        SharedModule,
        ProfileFollowModule
    ]
})
export class ProfileModule {
}
