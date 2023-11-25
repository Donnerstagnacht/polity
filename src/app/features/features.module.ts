import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppSkeletonComponent} from './app-skeleton/app-skeleton.component';
import {FeaturesRoutingModule} from "./features-routing.module";
import {TuiLoaderModule} from "@taiga-ui/core";
import {FirstBarBottomComponent} from "../navigation/first-bar-bottom/first-bar-bottom.component";
import {FirstBarLeftComponent} from "../navigation/first-bar-left/first-bar-left.component";
import {AssistantComponent} from "./assistant/assistant/assistant.component";

@NgModule({
    declarations: [
        AppSkeletonComponent,
    ],
    imports: [
        CommonModule,
        FeaturesRoutingModule,
        TuiLoaderModule,
        FirstBarBottomComponent,
        FirstBarLeftComponent,
        AssistantComponent,
    ]
})
export class FeaturesModule {
}
