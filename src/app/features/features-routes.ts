import {Routes} from '@angular/router';

import {CreateGroupStore} from './new/state/create-group.store';
import {SearchUserStore} from '@polity-search/state/search-user.store';
import {SearchGroupStore} from '@polity-search/state/search-group.store';
import {HomeRouter} from './home/home-router/home-router.component';
import {SearchRouter} from '@polity-search/search-router/search.router';
import {OfficeRouter} from '@polity-office/office-router/office.router';
import {GroupRouter} from '@polity-group/group-router/group.router';
import {NewRouter} from './new/new-router/new-router.component';
import {ProfileRouter} from '@polity-profile/profile-router/profile.router';
import {ProfileStore} from '@polity-profile/state/profile.store';
import {ProfileCounterStore} from '@polity-profile/profile-follow-state/profile-counter.store';
import {MembershipsOfUserStore} from '@polity-profile/profile-groups-state/memberships-of-user.store';


export const FEATURE_ROUTES: Routes = [
    {
        path: '',
        component: HomeRouter,
        loadChildren: () => import('./home/home-routes').then(m => m.HOME_ROUTES),
        providers: [
            MembershipsOfUserStore,
            ProfileStore,
            ProfileCounterStore
        ]
    },
    {
        path: 'search',
        component: SearchRouter,
        loadChildren: () => import('./search/search-routes').then(m => m.SEARCH_ROUTES),
        providers: [
            SearchUserStore,
            SearchGroupStore
        ]
    },
    {
        path: 'profile/:id',
        component: ProfileRouter,
        loadChildren: () => import('./profile/profile-routes').then(m => m.PROFILE_ROUTES)
    },
    {
        path: 'home',
        component: HomeRouter,
        loadChildren: () => import('./home/home-routes').then(m => m.HOME_ROUTES)
    },
    {
        path: 'new',
        component: NewRouter,
        loadChildren: () => import('./new/new-routes').then(m => m.NEW_ROUTES),
        providers: [
            CreateGroupStore
        ]
    },
    {
        path: 'office',
        component: OfficeRouter,
        loadChildren: () => import('./office/office-routes').then(m => m.OFFICE_ROUTES)
    },
    {
        path: 'group/:id',
        component: GroupRouter,
        loadChildren: () => import('./group/group-routes').then(m => m.GROUP_ROUTES)
    }
];
