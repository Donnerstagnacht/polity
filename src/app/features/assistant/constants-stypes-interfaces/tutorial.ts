export type Tutorial = {
    title: string,
    description: string,
    dataCy: string
}

export const TUTORIALS: Tutorial[] = [
    {
        title: 'Willkommen',
        description: 'Wir stellen uns vor.',
        dataCy: 'assistant-welcome-dialog',
    },
    {
        title: 'Dein Profil',
        description: 'Zeige der Welt wofür du stehst.',
        dataCy: 'assistant-profile-dialog',
    },
    {
        title: 'Unsere Suche',
        description: 'Finde Like Minded Menschen.',
        dataCy: 'assistant-search-dialog',
    },
    {
        title: 'Follow ',
        description: 'Follow deinen Lieblingspersonen.',
        dataCy: 'assistant-follow-dialog',
    }
]
