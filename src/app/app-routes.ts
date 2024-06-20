import {Routes} from '@angular/router';
import {isSignedInGuard} from './auth/is-signed-in.guard';
import {AppSkeletonRouter} from './features/app-skeleton-router/app-skeleton.router';
import {LandingRouter} from './landing/landing-router/landing.router';

export const APP_ROUTES: Routes = [
    {
        path: 'landing',
        component: LandingRouter,
        loadChildren: () => import('./landing/landing-routes').then(m => m.LANDING_ROUTES)
    },
    {
        path: '',
        component: AppSkeletonRouter,
        canActivateChild: [isSignedInGuard],
        loadChildren: () => import('./features/features-routes').then(m => m.FEATURE_ROUTES)
    },
    {
        path: '**',
        redirectTo: 'landing'
    }
];
