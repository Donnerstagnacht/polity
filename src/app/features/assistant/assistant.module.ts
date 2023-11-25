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
import {AssistantIconComponent} from './assistant-icon/assistant-icon.component';
import {AssistantToggleComponent} from './assistant-toggle/assistant-toggle.component';
import {AssistantComponent} from "./assistant/assistant.component";


@NgModule({
    declarations: [
        AssistantWelcomeDialogComponent,
        AssistantComponent,
        AssistantIconComponent,
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
        AssistantComponent,
        AssistantToggleComponent
    ]
})
export class AssistantModule {
}
