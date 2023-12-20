import {importProvidersFrom, isDevMode} from '@angular/core';
import {AppComponent} from './app/app.component';
import {provideAnimations} from '@angular/platform-browser/animations';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {NgDompurifySanitizer} from '@tinkoff/ng-dompurify';
import {TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiNotificationModule, TuiRootModule} from '@taiga-ui/core';
import {provideRouter, withViewTransitions} from "@angular/router";
import {APP_ROUTES} from "./app/app-routes";
import { provideServiceWorker } from '@angular/service-worker';

bootstrapApplication(AppComponent, {
    providers: [
    importProvidersFrom(BrowserModule, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiNotificationModule),
    {
        provide: TUI_SANITIZER,
        useClass: NgDompurifySanitizer
    },
    provideAnimations(),
    provideRouter(APP_ROUTES, withViewTransitions()),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
]
})
.catch(err => console.error(err));
