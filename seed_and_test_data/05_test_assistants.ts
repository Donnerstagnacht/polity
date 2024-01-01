import * as jsonData from './05_assisants.json';

export type Assistant = {
    id: string,
    first_sign_in: boolean | string
    skip_tutorial: boolean | string,
    last_tutorial: string
}

const Assistants: Assistant[] = jsonData;

const ASSISTANT1: Assistant = Assistants[0]
const ASSISTANT2: Assistant = Assistants[1]
const ASSISTANT3: Assistant = Assistants[2]
const ASSISTANT4: Assistant = Assistants[3]
const ASSISTANT5: Assistant = Assistants[4]
const ASSISTANT6: Assistant = Assistants[5]
const ASSISTANT7: Assistant = Assistants[6]
const ASSISTANT8: Assistant = Assistants[7]
const ASSISTANT9: Assistant = Assistants[8]
const ASSISTANT10: Assistant = Assistants[9]

export {
    ASSISTANT1,
    ASSISTANT2,
    ASSISTANT3,
    ASSISTANT4,
    ASSISTANT5,
    ASSISTANT6,
    ASSISTANT7,
    ASSISTANT8,
    ASSISTANT9,
    ASSISTANT10
};
