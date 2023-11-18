import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssistantWelcomeDialogComponent} from './assistant-welcome-dialog/assistant-welcome-dialog.component';
import {
    TuiButtonModule,
    TuiDialogModule,
    TuiErrorModule,
    TuiHintModule,
    TuiPrimitiveTextfieldModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {AssisstantComponent} from './assisstant/assisstant.component';
import {TuiAutoFocusModule} from "@taiga-ui/cdk";
import {ReactiveFormsModule} from "@angular/forms";
import {
    TuiActionModule,
    TuiCarouselModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiMarkerIconModule,
    TuiPaginationModule,
    TuiToggleModule
} from "@taiga-ui/kit";
import {AssisstantIconComponent} from './assisstant-icon/assisstant-icon.component';
import {AssistantToggleComponent} from './assistant-toggle/assistant-toggle.component';


@NgModule({
    declarations: [
        AssistantWelcomeDialogComponent,
        AssisstantComponent,
        AssisstantIconComponent,
        AssistantToggleComponent
    ],
    imports: [
        CommonModule,
        TuiPrimitiveTextfieldModule,
        TuiAutoFocusModule,
        TuiButtonModule,
        ReactiveFormsModule,
        TuiHintModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiSvgModule,
        TuiPaginationModule,
        TuiCarouselModule,
        TuiDialogModule,
        TuiMarkerIconModule,
        TuiActionModule,
        TuiToggleModule
    ],
    exports: [
        AssistantWelcomeDialogComponent,
        AssisstantComponent,
        AssistantToggleComponent
    ]
})
export class AssistantModule {
}
