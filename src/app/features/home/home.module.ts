import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home/home.component';
import {LinkCardComponent} from "../../ui/link-card/link-card.component";


@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        LinkCardComponent
    ]
})
export class HomeModule {
}
