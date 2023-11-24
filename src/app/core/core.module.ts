import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in/sign-in.component';
import {TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule} from "@taiga-ui/kit";
import {
    TuiButtonModule,
    TuiErrorModule,
    TuiHintModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {ReactiveFormsModule} from "@angular/forms";
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignOutComponent} from './sign-out/sign-out.component';


@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent,
        SignOutComponent
    ],
    exports: [
        SignInComponent,
        SignUpComponent,
        SignOutComponent
    ],
    imports: [
        CommonModule,
        TuiInputModule,
        TuiButtonModule,
        TuiInputPasswordModule,
        ReactiveFormsModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiHintModule,
        TuiSvgModule,
        TuiTextfieldControllerModule
    ]
})
export class CoreModule {
}
