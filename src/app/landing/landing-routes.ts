import {Routes} from '@angular/router';
import {FeatureDescriptionPage} from './feature-description-page/feature-description.page';
import {SignInPage} from '../auth/sign-in-page/sign-in.page';
import {SignUpPage} from '../auth/sign-up-page/sign-up.page';
import {RequestResetPasswordPage} from '../auth/request-reset-password-page/request-reset-password.page';
import {ResetPasswordPage} from '../auth/reset-password-page/reset-password.page';


export const LANDING_ROUTES: Routes = [
    {
        path: '',
        component: FeatureDescriptionPage
    },
    {
        path: 'sign-in',
        component: SignInPage
    },
    {
        path: 'signup',
        component: SignUpPage
    },
    {
        path: 'request-reset-password',
        component: RequestResetPasswordPage
    },
    {
        path: 'reset-password',
        component: ResetPasswordPage
    }
];
