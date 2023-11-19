import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {FeatureDescriptionComponent} from "./feature-description/feature-description.component";
import {SignInComponent} from "../core/sign-in/sign-in.component";
import {SignUpComponent} from "../core/sign-up/sign-up.component";

const routes: Routes = [
    {
        path: '',
        component: FeatureDescriptionComponent
    },
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class CoreRoutingModule {
}
