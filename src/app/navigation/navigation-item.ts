import {NavigationItem} from "./types-and-interfaces/navigationItem";

export const navigationItem: NavigationItem[] = [
    {
        text: 'SUCHE',
        icon: 'tuiIconSearch',
        link: '/search',
        dataCy: 'nav-search',
        dataCyDesktop: 'nav-search-desktop'
    },
    {
        text: 'NEU',
        icon: 'tuiIconPlus',
        link: '/new',
        dataCy: 'nav-new',
        dataCyDesktop: 'nav-new-desktop'
    },
    {
        text: 'OFFICE',
        icon: 'tuiIconCalendar',
        link: '/office',
        badge: 100,
        dataCy: 'nav-office',
        dataCyDesktop: 'nav-office-desktop'
    },
    {
        text: 'HOME',
        icon: 'tuiIconHome',
        link: '/home',
        dataCy: 'nav-home',
        dataCyDesktop: 'nav-home-desktop'
    },
];

export const navigationItemsSignedOut: NavigationItem[] = [
    {
        text: 'REGISTER',
        icon: 'tuiIconPlusCircle',
        link: '/landing/signup',
        dataCy: 'nav-sign-up',
        dataCyDesktop: 'nav-sign-up-desktop'
    },
    {
        text: 'LANDING',
        icon: 'tuiIconHome',
        link: '/landing',
        dataCy: 'nav-landing',
        dataCyDesktop: 'nav-landing-desktop'
    },
    {
        text: 'LOGIN',
        icon: 'tuiIconLogIn',
        link: '/landing/sign-in',
        dataCy: 'nav-sign-in',
        dataCyDesktop: 'nav-sign-in-desktop'
    }
];

export const navigationItemsProfileOwner: NavigationItem[] = [
    {
        text: 'HOME',
        icon: 'tuiIconUser',
        link: '/profile',
        dataCy: 'nav-profile-wiki',
        dataCyDesktop: 'nav-profile-wiki-desktop'
    },
    {
        text: 'EDIT',
        icon: 'tuiIconEdit2',
        link: '/profile/edit',
        dataCy: 'nav-profile-edit',
        dataCyDesktop: 'nav-profile-edit-desktop'
    },
    {
        text: 'EDIT',
        icon: 'tuiIconUsers',
        link: '/profile/follower/edit',
        dataCy: 'nav-follower-edit',
        dataCyDesktop: 'nav-follower-edit-desktop'
    }
]

export const navigationItemsProfile: NavigationItem[] = [
    {
        text: 'HOME',
        icon: 'tuiIconUser',
        link: '/profile',
        dataCy: 'nav-profile-wiki',
        dataCyDesktop: 'nav-profile-wiki-desktop'
    }
]

export const navigationItemsOffice: NavigationItem[] = [
    {
        text: 'NEWS',
        icon: 'tuiIconUser',
        link: '/office',
        dataCy: 'nav-office-news',
        dataCyDesktop: 'nav-office-news-desktop'
    }
]
