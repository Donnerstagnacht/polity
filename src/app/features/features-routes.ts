import {Routes} from '@angular/router';
import {ProfileComponent} from './profile/profile/profile.component';
import {HomeComponent} from './home/home/home.component';
import {SearchComponent} from './search/search/search.component';
import {OfficeComponent} from './office/office/office.component';
import {GroupComponent} from './group/group/group.component';
import {NewHomeComponent} from './new/new-home/new-home.component';
import {GroupCounterStore} from './group-follow/state/group-counter.store';
import {GroupStore} from './group/state/group.store.';
import {GroupFollowStore} from './group-follow/state/group-follow.store';
import {FollowingsOfGroupStore} from './group-follow/state/followings-of-group.store';
import {FollowersOfGroupStore} from './group-follow/state/followers-of-group.store';
import {GroupRequestsStore} from './group_member/state/group-requests.store';
import {GroupInvitationsStore} from './group_member/state/group-invitations.store';
import {GroupMembersStore} from './group_member/state/group-members.store';
import {GroupMembershipStatusStore} from './group_member/state/group-membership-status.store';
import {InvitationsOfUserStore} from './profile-groups/state/invitations-of-user.store';
import {RequestsOfUserStore} from './profile-groups/state/requests-of-user.store';
import {MembershipsOfUserStore} from './profile-groups/state/memberships-of-user.store';
import {FollowersOfUserStore} from './profile-follow/state/followers-of-user.store';
import {FollowingsOfUserStore} from './profile-follow/state/followings-of-user.store';
import {FollowingsOfUserGroupStore} from './profile-follow/state/followings-of-user-group.store';
import {ProfileCounterStore} from './profile-follow/state/profile-counter.store';
import {ProfileFollowStore} from './profile-follow/state/profile-follow-store.service';
import {NotificationSettingsStore} from './notifications/state/notification-settings.store';
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
        loadChildren: () => import('./profile/profile-routes').then(m => m.PROFILE_ROUTES),
        providers: [
            ProfileCounterStore,

            ProfileFollowStore,
            FollowersOfUserStore,
            FollowingsOfUserStore,
            FollowingsOfUserGroupStore,

            InvitationsOfUserStore,
            RequestsOfUserStore,
            MembershipsOfUserStore,

            NotificationSettingsStore
        ]
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
        loadChildren: () => import('./group/group-routes').then(m => m.GROUP_ROUTES),
        providers: [
            GroupStore,
            GroupCounterStore,

            GroupFollowStore,
            FollowingsOfGroupStore,
            FollowersOfGroupStore,

            GroupRequestsStore,
            GroupInvitationsStore,
            GroupMembersStore,
            GroupMembershipStatusStore
        ]
    }
];
