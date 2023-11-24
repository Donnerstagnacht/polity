import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingRoutingModule} from "./landing-routing.module";
import {FeatureDescriptionComponent} from "./feature-description/feature-description.component";
import {LandingComponent} from "./landing/landing.component";
import {CoreModule} from "../core/core.module";
import {SharedModule} from "../shared/shared.module";
import {LayoutModule} from "../layout/layout.module";
import {TuiButtonModule} from "@taiga-ui/core";


@NgModule({
    declarations: [
        FeatureDescriptionComponent,
        LandingComponent
    ],
    imports: [
        CommonModule,
        LandingRoutingModule,
        CoreModule,
        SharedModule,
        LayoutModule,
        TuiButtonModule
    ]
})
export class LandingModule {
}
