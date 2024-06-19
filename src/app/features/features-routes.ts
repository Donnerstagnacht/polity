import {Routes} from '@angular/router';
import {ProfileComponent} from './profile/profile/profile.component';
import {HomeComponent} from './home/home/home.component';
import {SearchComponent} from './search/search/search.component';
import {OfficeComponent} from './office/office/office.component';
import {GroupComponent} from './group/group/group.component';
import {NewHomeComponent} from './new/new-home/new-home.component';
import {SearchGroupStore} from './search/state/search-group.store';
import {SearchUserStore} from './search/state/search-user.store';
import {CreateGroupStore} from './new/state/create-group.store';

export const FEATURE_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        loadChildren: () => import('./home/home-routes').then(m => m.HOME_ROUTES)
    },
    {
        path: 'search',
        component: SearchComponent,
        loadChildren: () => import('./search/search-routes').then(m => m.SEARCH_ROUTES),
        providers: [
            SearchUserStore,
            SearchGroupStore
        ]
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
        component: NewHomeComponent,
        loadChildren: () => import('./new/new-routes').then(m => m.NEW_ROUTES),
        providers: [
            CreateGroupStore
        ]
    },
    {
        path: 'office',
        component: OfficeComponent,
        loadChildren: () => import('./office/office-routes').then(m => m.OFFICE_ROUTES)
    },
    {
        path: 'group/:id',
        component: GroupComponent,
        loadChildren: () => import('./group/group-routes').then(m => m.GROUP_ROUTES)
    }
];
