import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchRoutingModule} from './search-routing.module';
import {SearchComponent} from './search/search.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TuiErrorModule, TuiHintModule, TuiLoaderModule} from "@taiga-ui/core";
import {TuiFieldErrorPipeModule, TuiInputModule} from "@taiga-ui/kit";
import {TuiForModule} from "@taiga-ui/cdk";
import {SharedModule} from "../../shared/shared.module";
import {SearchUserComponent} from './search-user/search-user.component';

@NgModule({
    declarations: [
        SearchComponent,
        SearchUserComponent
    ],
    imports: [
        CommonModule,
        SearchRoutingModule,
        ReactiveFormsModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiHintModule,
        TuiInputModule,
        TuiLoaderModule,
        TuiForModule,
        SharedModule
    ]
})
export class SearchModule {
}
