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
                loadChildren: () => import('./home/home-routing.module').then(m => m.HomeRoutingModule)
            }
        ]
    },
    {
        path: 'search',
        component: SearchComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./search/search-routing.module').then(m => m.SearchRoutingModule)
            }
        ]
    },
    {
        path: 'profile/:id',
        component: ProfileComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./profile/profile-routing.module').then(m => m.ProfileRoutingModule)
            }
        ]
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./home/home-routing.module').then(m => m.HomeRoutingModule)
            }
        ]
    },
    {
        path: 'new',
        component: NewComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./new/new-routing.module').then(m => m.NewRoutingModule)
            }
        ]
    },
    {
        path: 'office',
        component: OfficeComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./office/office-routing.module').then(m => m.OfficeRoutingModule)
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
