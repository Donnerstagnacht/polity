import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotificationComponent} from "../notifications/notification/notification.component";

const routes: Routes = [
    {
        path: '',
        component: NotificationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OfficeRoutingModule {
}
