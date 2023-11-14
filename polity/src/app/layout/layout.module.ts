import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainBarBottomComponent} from './main-bar-bottom/main-bar-bottom.component';
import {MainBarSideComponent} from './main-bar-side/main-bar-side.component';
import {TuiAppBarModule, TuiTabBarModule} from "@taiga-ui/addon-mobile";
import {TuiButtonModule, TuiHintModule, TuiTooltipModule} from "@taiga-ui/core";
import {CdkTableModule} from "@angular/cdk/table";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SecondBarTopComponent} from './second-bar-top/second-bar-top.component';
import {SecondBarSideComponent} from './second-bar-side/second-bar-side.component';

@NgModule({
    declarations: [
        MainBarBottomComponent,
        MainBarSideComponent,
        SecondBarTopComponent,
        SecondBarSideComponent
    ],
    exports: [
        MainBarBottomComponent,
        MainBarSideComponent,
        SecondBarSideComponent,
        SecondBarTopComponent
    ],
    imports: [
        CommonModule,
        TuiAppBarModule,
        TuiButtonModule,
        TuiTabBarModule,
        CdkTableModule,
        TuiTooltipModule,
        TuiHintModule,
        RouterLinkActive,
        RouterLink
    ]
})
export class LayoutModule {
}
