import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiIslandModule} from "@taiga-ui/kit";
import {LinkCardComponent} from './link-card/link-card.component';
import {LoadingComponent} from './loading/loading.component';
import {TuiLoaderModule} from "@taiga-ui/core";

@NgModule({
    declarations: [
        LinkCardComponent,
        LoadingComponent,
    ],
    exports: [
        LinkCardComponent,
        LoadingComponent,
    ],
    imports: [
        CommonModule,
        TuiIslandModule,
        TuiLoaderModule,
    ]
})
export class SharedModule {
}
