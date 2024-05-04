import {NavigationItem} from "./types-and-interfaces/navigationItem";

export const NAVIGATION_ITEMS: NavigationItem[] = [
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

export const NAVIGATION_ITEMS_SIGNED_OUT: NavigationItem[] = [
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

