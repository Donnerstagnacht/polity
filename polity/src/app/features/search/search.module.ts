import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchRoutingModule} from './search-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {TuiErrorModule, TuiHintModule, TuiLoaderModule} from "@taiga-ui/core";
import {TuiFieldErrorPipeModule, TuiInputModule, TuiIslandModule} from "@taiga-ui/kit";
import {TuiForModule} from "@taiga-ui/cdk";
import {SharedModule} from "../../shared/shared.module";
import {SearchUserComponent} from './search-user/search-user.component';
import {SearchProfileResult} from "./search-profile-result/search-profile-result.component";
import {SearchComponent} from "./search/search.component";

@NgModule({
    declarations: [
        SearchComponent,
        SearchUserComponent,
        SearchProfileResult
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
        SharedModule,
        TuiIslandModule
    ]
})
export class SearchModule {
}
