import * as jsonData from './07_groups.json';

export type Group = {
    id: string
    creator: string
    name: string
    description: string
    level: string
    img_url: string
}

const Groups: Group[] = jsonData;

export const GROUP1: Group = Groups[0];
export const GROUP2: Group = Groups[1];
export const GROUP3: Group = Groups[2];
