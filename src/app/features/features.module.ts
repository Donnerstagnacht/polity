import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppSkeletonComponent} from './app-skeleton/app-skeleton.component';
import {FeaturesRoutingModule} from "./features-routing.module";
import {LayoutModule} from "../layout/layout.module";
import {TuiLoaderModule} from "@taiga-ui/core";
import {SharedModule} from "../shared/shared.module";
import {AssistantModule} from "./assistant/assistant.module";

@NgModule({
    declarations: [
        AppSkeletonComponent,
    ],
    imports: [
        CommonModule,
        FeaturesRoutingModule,
        LayoutModule,
        TuiLoaderModule,
        SharedModule,
        AssistantModule,
    ]
})
export class FeaturesModule {
}
