import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreRoutingModule} from "./core-routing.module";
import {FeatureDescriptionComponent} from "./feature-description/feature-description.component";
import {LandingComponent} from "./landing/landing.component";
import {CoreModule} from "../core/core.module";
import {LayoutModule} from "../layout/layout.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [
        FeatureDescriptionComponent,
        LandingComponent
    ],
    imports: [
        CommonModule,
        CoreRoutingModule,
        CoreModule,
        LayoutModule,
        SharedModule
    ]
})
export class LandingModule {
}
