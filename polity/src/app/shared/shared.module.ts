import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileCardComponent} from './profile-card/profile-card.component';
import {TuiIslandModule} from "@taiga-ui/kit";
import {LinkCardComponent} from './link-card/link-card.component';
import {LoadingComponent} from './loading/loading.component';
import {TuiLoaderModule} from "@taiga-ui/core";
import {KeyFigureList} from './key-figure/key-figure-list.component';

@NgModule({
    declarations: [
        ProfileCardComponent,
        LinkCardComponent,
        LoadingComponent,
        KeyFigureList
    ],
    exports: [
        ProfileCardComponent,
        LinkCardComponent,
        LoadingComponent,
        KeyFigureList
    ],
    imports: [
        CommonModule,
        TuiIslandModule,
        TuiLoaderModule
    ]
})
export class SharedModule {
}
