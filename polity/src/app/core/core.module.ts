import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in/sign-in.component';
import {TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule} from "@taiga-ui/kit";
import {
    TuiButtonModule,
    TuiErrorModule,
    TuiHintModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {ReactiveFormsModule} from "@angular/forms";
import {SignUpComponent} from './sign-up/sign-up.component';
import {CoreRoutingModule} from "./core-routing.module";
import {FeatureDescriptionComponent} from './feature-description/feature-description.component';
import {LandingComponent} from './landing/landing.component';
import {LayoutModule} from "../layout/layout.module";
import {SignOutComponent} from './sign-out/sign-out.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent,
        FeatureDescriptionComponent,
        LandingComponent,
        SignOutComponent
    ],
    exports: [
        SignInComponent,
        SignUpComponent,
        SignOutComponent
    ],
    imports: [
        CommonModule,
        CoreRoutingModule,
        TuiInputModule,
        TuiButtonModule,
        TuiInputPasswordModule,
        ReactiveFormsModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiHintModule,
        TuiSvgModule,
        TuiTextfieldControllerModule,
        LayoutModule,
        SharedModule
    ]
})
export class CoreModule {
}
