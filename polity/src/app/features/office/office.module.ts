import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OfficeRoutingModule} from './office-routing.module';
import {OfficeComponent} from './office/office.component';


@NgModule({
    declarations: [
        OfficeComponent
    ],
    imports: [
        CommonModule,
        OfficeRoutingModule
    ]
})
export class OfficeModule {
}
