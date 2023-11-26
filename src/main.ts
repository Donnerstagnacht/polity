import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TUI_SANITIZER, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiNotificationModule } from '@taiga-ui/core';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiNotificationModule),
        { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
        provideAnimations()
    ]
})
.catch(err => console.error(err));
