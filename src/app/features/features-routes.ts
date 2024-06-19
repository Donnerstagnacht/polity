import {Routes} from '@angular/router';
import {ProfileComponent} from './profile/profile/profile.component';
import {HomeComponent} from './home/home/home.component';
import {SearchComponent} from './search/search/search.component';
import {OfficeComponent} from './office/office/office.component';
import {GroupComponent} from './group/group/group.component';
import {NewHomeComponent} from './new/new-home/new-home.component';
import {GroupCounterStore} from './group-follow/store/group-counter.store';
import {GroupStore} from './group/store/group.store.';
import {GroupFollowStore} from './group-follow/store/group-follow.store';
import {FollowingsOfGroupStore} from './group-follow/store/followings-of-group.store';
import {FollowersOfGroupStore} from './group-follow/store/followers-of-group.store';
import {GroupRequestsStore} from './group_member/store/group-requests.store';
import {GroupInvitationsStore} from './group_member/store/group-invitations.store';
import {GroupMembersStore} from './group_member/store/group-members.store';
import {GroupMembershipStatusStore} from './group_member/store/group-membership-status.store';
import {InvitationsOfUserStore} from './profile-groups/store/invitations-of-user.store';
import {RequestsOfUserStore} from './profile-groups/store/requests-of-user.store';
import {MembershipsOfUserStore} from './profile-groups/store/memberships-of-user.store';
import {FollowersOfUserStore} from './profile-follow/store/followers-of-user.store';
import {FollowingsOfUserStore} from './profile-follow/store/followings-of-user.store';
import {FollowingsOfUserGroupStore} from './profile-follow/store/followings-of-user-group.store';
import {ProfileCounterStore} from './profile-follow/store/profile-counter.store';
import {ProfileFollowStore} from './profile-follow/store/profile-follow-store.service';
import {NotificationSettingsStore} from './notifications/store/notification-settings.store';
import {SearchGroupStore} from './search/store/search-group.store';
import {SearchUserStore} from './search/store/search-user.store';
import {CreateGroupStore} from './new/store/create-group.store';

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
