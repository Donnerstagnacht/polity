import {NavigationItem} from "../../navigation/types-and-interfaces/navigationItem";

export const NAVIGATION_ITEMS_PROFILE_OWNER: NavigationItem[] = [
    {
        text: 'HOME',
        icon: 'tuiIconUser',
        link: '/profile/:id',
        dataCy: 'nav-profile-wiki',
        dataCyDesktop: 'nav-profile-wiki-desktop'
    },
    {
        text: 'EDIT',
        icon: 'tuiIconEdit2',
        link: '/profile/:id/edit',
        dataCy: 'nav-profile-edit',
        dataCyDesktop: 'nav-profile-edit-desktop'
    },
    {
        text: 'EDIT',
        icon: 'tuiIconUsers',
        link: '/profile/id/follower/edit',
        dataCy: 'nav-follower-edit',
        dataCyDesktop: 'nav-follower-edit-desktop'
    }
]
