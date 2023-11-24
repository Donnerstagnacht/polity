import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile/profile/profile.component";
import {HomeComponent} from "./home/home/home.component";
import {SearchComponent} from "./search/search/search.component";
import {NewComponent} from "./new/new/new.component";
import {OfficeComponent} from "./office/office/office.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
            }
        ]
    },
    {
        path: 'search',
        component: SearchComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
            }
        ]
    },
    {
        path: 'profile/:id',
        component: ProfileComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
            }
        ]
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
            }
        ]
    },
    {
        path: 'new',
        component: NewComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./new/new.module').then(m => m.NewModule)
            }
        ]
    },
    {
        path: 'office',
        component: OfficeComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./office/office.module').then(m => m.OfficeModule)
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeaturesRoutingModule {

}
