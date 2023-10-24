import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileWikiComponent } from './profile-wiki/profile-wiki.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule} from "@taiga-ui/kit";
import {
    TuiButtonModule,
    TuiErrorModule,
    TuiHintModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";


@NgModule({
    declarations: [
        ProfileComponent,
        ProfileWikiComponent,
        ProfileEditComponent
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
        TuiTextfieldControllerModule
    ]
})
export class ProfileModule { }
