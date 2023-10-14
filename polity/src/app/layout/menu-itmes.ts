export type Item = {
    badge?: number;
    icon: string;
    text: string;
}

export const menuItems: Item[] = [
    {
        text: 'VOR ORT',
        icon: 'tuiIconUsers',
        badge: 3,
    },
    {
        text: 'SUCHE',
        icon: 'tuiIconSearch',
        badge: 1234,
    },
    {
        text: 'NEU',
        icon: 'tuiIconPlus',
    },
    {
        text: 'ORGA',
        icon: 'tuiIconCalendar',
        badge: 100,
    },
    {
        text: 'HOME',
        icon: 'tuiIconHome',
    },
];
