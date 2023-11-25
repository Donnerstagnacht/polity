import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppSkeletonComponent} from "./features/app-skeleton/app-skeleton.component";
import {isSignedInGuard} from "./auth/is-signed-in.guard";
import {LandingComponent} from "./landing/landing/landing.component";

const routes: Routes = [
    {
        path: 'landing',
        component: LandingComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./landing/landing-routing.module').then(m => m.LandingRoutingModule)
            }
        ]
    },
    {
        path: '',
        component: AppSkeletonComponent,
        canActivateChild: [isSignedInGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./features/features-routing.module').then(m => m.FeaturesRoutingModule)
            }
        ],
    },
    {
        path: '**',
        redirectTo: 'landing',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
