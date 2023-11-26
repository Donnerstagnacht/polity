import {Routes} from '@angular/router';
import {AppSkeletonComponent} from "./features/app-skeleton/app-skeleton.component";
import {isSignedInGuard} from "./auth/is-signed-in.guard";
import {LandingComponent} from "./landing/landing/landing.component";

export const APP_ROUTES: Routes = [
    {
        path: 'landing',
        component: LandingComponent,
        loadChildren: () => import('./landing/landing-routes').then(m => m.LANDING_ROUTES)
    },
    {
        path: '',
        component: AppSkeletonComponent,
        canActivateChild: [isSignedInGuard],
        loadChildren: () => import('./features/features-routes').then(m => m.FEATURE_ROUTES)
    },
    {
        path: '**',
        redirectTo: 'landing',
    }
];
