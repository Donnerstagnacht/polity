import {Routes} from "@angular/router";
import {ProfileComponent} from "./profile/profile/profile.component";
import {HomeComponent} from "./home/home/home.component";
import {SearchComponent} from "./search/search/search.component";
import {NewComponent} from "./new/new/new.component";
import {OfficeComponent} from "./office/office/office.component";

export const FEATURE_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        loadChildren: () => import('./home/home-routing.module').then(m => m.HOME_ROUTES)
    },
    {
        path: 'search',
        component: SearchComponent,
        loadChildren: () => import('./search/search-routing.module').then(m => m.SEARCH_ROUTES)
    },
    {
        path: 'profile/:id',
        component: ProfileComponent,
        // children: [
        //     {
        //         path: '',
        //         loadChildren: () => import('./profile/profile-routing.module').then(m => m.ProfileRoutingModule)
        //     }
        // ]
        loadChildren: () => import('./profile/profile-routing.module').then(m => m.PROFILE_ROUTES)
    },
    {
        path: 'home',
        component: HomeComponent,
        loadChildren: () => import('./home/home-routing.module').then(m => m.HOME_ROUTES)
    },
    {
        path: 'new',
        component: NewComponent,
        loadChildren: () => import('./new/new-routing.module').then(m => m.NEW_ROUTES)
    },
    {
        path: 'office',
        component: OfficeComponent,
        loadChildren: () => import('./office/office-routing.module').then(m => m.OFFICE_ROUTES)
    }
]
