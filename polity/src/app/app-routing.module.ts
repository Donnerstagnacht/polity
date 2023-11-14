import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppSkeletonComponent} from "./features/app-skeleton/app-skeleton.component";
import {LandingComponent} from "./core/landing/landing.component";
import {isSignedInGuard} from "./core/is-signed-in.guard";

const routes: Routes = [
    {
        path: 'landing',
        component: LandingComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
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
