import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppSkeletonComponent} from "./features/app-skeleton/app-skeleton.component";
import {isSignedInGuard} from "./core/is-signed-in.guard";
import {LandingComponent} from "./landing/landing/landing.component";

const routes: Routes = [
    {
        path: 'landing',
        component: LandingComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
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
                loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule),
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
