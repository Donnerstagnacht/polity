export type filterTag = { text: string, value: string }

export const Filter_TYPES: filterTag[] = [
    {
        text: 'Followers',
        value: 'follow_from_user'
    },
    {
        text: 'Groups',
        value: 'follow_from_group'
    }
]
