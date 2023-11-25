import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingRoutingModule} from "./landing-routing.module";
import {FeatureDescriptionComponent} from "./feature-description/feature-description.component";
import {LandingComponent} from "./landing/landing.component";
import {TuiButtonModule} from "@taiga-ui/core";
import {FirstBarBottomComponent} from "../navigation/first-bar-bottom/first-bar-bottom.component";
import {FirstBarLeftComponent} from "../navigation/first-bar-left/first-bar-left.component";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        FeatureDescriptionComponent,
        LandingComponent
    ],
    imports: [
        CommonModule,
        LandingRoutingModule,
        TuiButtonModule,
        FirstBarBottomComponent,
        FirstBarLeftComponent,
        RouterModule
    ]
})
export class LandingModule {
}
