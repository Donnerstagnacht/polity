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
        loadChildren: () => import('./home/home-routes').then(m => m.HOME_ROUTES)
    },
    {
        path: 'search',
        component: SearchComponent,
        loadChildren: () => import('./search/search-routes').then(m => m.SEARCH_ROUTES)
    },
    {
        path: 'profile/:id',
        component: ProfileComponent,
        loadChildren: () => import('./profile/profile-routes').then(m => m.PROFILE_ROUTES)
    },
    {
        path: 'home',
        component: HomeComponent,
        loadChildren: () => import('./home/home-routes').then(m => m.HOME_ROUTES)
    },
    {
        path: 'new',
        component: NewComponent,
        loadChildren: () => import('./new/new-routes').then(m => m.NEW_ROUTES)
    },
    {
        path: 'office',
        component: OfficeComponent,
        loadChildren: () => import('./office/office-routes').then(m => m.OFFICE_ROUTES)
    }
]
