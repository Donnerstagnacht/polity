import {Routes} from "@angular/router";
import {FeatureDescriptionComponent} from "./feature-description/feature-description.component";
import {SignInComponent} from "../auth/sign-in/sign-in.component";
import {SignUpComponent} from "../auth/sign-up/sign-up.component";
import {ResetPasswordComponent} from "../auth/reset-password/reset-password.component";
import {RequestResetPasswordComponent} from "../auth/request-reset-password/request-reset-password.component";

export const LANDING_ROUTES: Routes = [
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
    {
        path: 'request-reset-password',
        component: RequestResetPasswordComponent
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent
    },
]
