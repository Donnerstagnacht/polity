import {NavigationItem} from '@polity-navigation/types-and-interfaces/navigationItem';

export const NAVIGATION_ITEMS_GROUP_BOARD_MEMBER: NavigationItem[] = [
    {
        text: 'HOME',
        icon: 'tuiIconUser',
        link: '/group/:id',
        dataCy: 'nav-group-wiki',
        dataCyDesktop: 'nav-group-wiki-desktop'
    },
    {
        text: 'EDIT GROUP',
        icon: 'tuiIconEdit2',
        link: '/group/:id/edit',
        dataCy: 'nav-group-edit',
        dataCyDesktop: 'nav-group-edit-desktop'
    }
    // {
    //     text: 'EDIT',
    //     icon: 'tuiIconUsers',
    //     link: '/group/id/follower/edit',
    //     dataCy: 'nav-follower-edit',
    //     dataCyDesktop: 'nav-follower-edit-desktop'
    // }
];
