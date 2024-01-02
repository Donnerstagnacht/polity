import * as jsonData from './02_profiles.json';

export type Profile = {
    id: string;
    first_name: string;
    last_name: string;
}

const Profiles: Profile[] = jsonData;

const PROFILE1: Profile = Profiles[0]
const PROFILE2: Profile = Profiles[1]
const PROFILE3: Profile = Profiles[2]
const PROFILE4: Profile = Profiles[3]
const PROFILE5: Profile = Profiles[4]
const PROFILE6: Profile = Profiles[5]
const PROFILE7: Profile = Profiles[6]
const PROFILE8: Profile = Profiles[7]
const PROFILE9: Profile = Profiles[8]
const PROFILE10: Profile = Profiles[9]

export {
    PROFILE1,
    PROFILE2,
    PROFILE3,
    PROFILE4,
    PROFILE5,
    PROFILE6,
    PROFILE7,
    PROFILE8,
    PROFILE9,
    PROFILE10
};
