import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppSkeletonComponent} from './app-skeleton/app-skeleton.component';
import {FeaturesRoutingModule} from "./features-routing.module";
import {TuiLoaderModule} from "@taiga-ui/core";
import {AssistantModule} from "./assistant/assistant.module";
import {FirstBarBottomComponent} from "../navigation/first-bar-bottom/first-bar-bottom.component";
import {FirstBarLeftComponent} from "../navigation/first-bar-left/first-bar-left.component";

@NgModule({
    declarations: [
        AppSkeletonComponent,
    ],
    imports: [
        CommonModule,
        FeaturesRoutingModule,
        TuiLoaderModule,
        AssistantModule,
        FirstBarBottomComponent,
        FirstBarLeftComponent,
    ]
})
export class FeaturesModule {
}
