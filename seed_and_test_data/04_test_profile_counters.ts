import * as profiles_jsonData from './02_profiles.json';
import * as following_jsonData from './03_following_profiles_relationships.json';

import {FollowingRelationship} from "./03_test_following_relationships";
import {Profile} from "./02_test_profiles";


export type ProfileCounter = {
    id: string;
    follower_counter: number;
    following_counter: number;
    unread_notifications_counter: number
}

const FollowingRelationship: FollowingRelationship[] = following_jsonData;
const Profiles: Profile[] = profiles_jsonData;

function findFollowerOfId(id: string): number {
    const relationShips: FollowingRelationship[] = [
        {
            "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
            "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
        },
        {
            "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
            "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
        },
        {
            "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
            "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
        },
        {
            "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
            "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
        },
        {
            "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
            "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
        },
        {
            "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
            "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
        },
        {
            "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
            "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
        },
        {
            "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
            "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
        },
        {
            "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
            "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
        },
        {
            "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
            "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
        },
        {
            "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
            "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
        },
        {
            "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
            "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
        },
        {
            "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
            "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
        },
        {
            "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
            "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
        },
        {
            "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
            "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
        },
        {
            "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
            "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
        },
        {
            "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
            "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
        },
        {
            "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
            "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
        },
        {
            "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
            "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
        },
        {
            "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
            "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
        },
        {
            "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
            "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
        },
        {
            "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
            "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
        },
        {
            "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
            "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
        },
        {
            "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
            "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
        },
        {
            "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
            "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
        },
        {
            "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
            "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
        },
        {
            "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
            "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
        },
        {
            "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
            "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
        },
        {
            "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
            "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
        },
        {
            "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
            "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
        },
        {
            "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
            "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
        },
        {
            "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
            "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
        },
        {
            "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
            "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
        },
        {
            "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
            "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
        },
        {
            "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
            "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
        },
        {
            "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
            "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
        },
        {
            "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
            "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
        },
        {
            "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
            "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
        },
        {
            "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
            "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
        },
        {
            "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
            "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
        },
        {
            "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
            "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
        },
        {
            "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
            "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
        },
        {
            "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
            "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
        },
        {
            "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
            "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
        },
        {
            "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
            "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
        },
        {
            "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
            "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
        },
        {
            "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
            "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
        },
        {
            "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
            "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
        },
        {
            "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
            "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
        },
        {
            "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
            "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
        },
        {
            "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
            "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
        },
        {
            "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
            "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
        },
        {
            "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
            "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
        },
        {
            "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
            "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
        },
        {
            "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
            "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
        },
        {
            "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
            "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
        },
        {
            "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
            "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
        },
        {
            "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
            "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
        },
        {
            "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
            "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
        },
        {
            "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
            "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
        },
        {
            "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
            "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
        },
        {
            "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
            "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
        },
        {
            "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
            "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
        },
        {
            "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
            "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
        },
        {
            "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
            "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
        },
        {
            "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
            "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
        },
        {
            "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
            "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
        },
        {
            "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
            "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
        },
        {
            "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
            "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
        },
        {
            "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
            "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
        },
        {
            "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
            "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
        },
        {
            "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
            "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
        },
        {
            "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
            "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
        },
        {
            "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
            "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
        },
        {
            "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
            "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
        },
        {
            "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
            "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
        },
        {
            "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
            "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
        },
        {
            "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
            "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
        },
        {
            "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
            "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
        },
        {
            "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
            "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
        }
    ]

    return relationShips.filter(item => item.following === id).length;
}

function findFollowingOfId(id: string): number {
    const relationShips: FollowingRelationship[] = [
        {
            "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
            "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
        },
        {
            "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
            "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
        },
        {
            "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
            "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
        },
        {
            "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
            "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
        },
        {
            "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
            "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
        },
        {
            "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
            "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
        },
        {
            "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
            "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
        },
        {
            "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
            "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
        },
        {
            "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
            "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
        },
        {
            "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
            "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
        },
        {
            "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
            "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
        },
        {
            "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
            "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
        },
        {
            "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
            "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
        },
        {
            "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
            "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
        },
        {
            "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
            "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
        },
        {
            "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
            "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
        },
        {
            "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
            "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
        },
        {
            "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
            "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
        },
        {
            "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
            "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
        },
        {
            "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
            "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
        },
        {
            "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
            "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
        },
        {
            "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
            "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
        },
        {
            "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
            "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
        },
        {
            "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
            "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
        },
        {
            "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
            "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
        },
        {
            "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
            "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
        },
        {
            "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
            "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
        },
        {
            "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
            "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
        },
        {
            "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
            "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
        },
        {
            "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
            "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
        },
        {
            "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
            "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
        },
        {
            "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
            "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
        },
        {
            "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
            "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
        },
        {
            "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
            "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
        },
        {
            "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
            "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
        },
        {
            "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
            "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
        },
        {
            "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
            "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
        },
        {
            "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
            "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
        },
        {
            "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
            "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
        },
        {
            "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
            "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
        },
        {
            "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
            "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
        },
        {
            "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
            "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
        },
        {
            "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
            "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
        },
        {
            "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
            "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
        },
        {
            "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
            "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
        },
        {
            "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
            "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
        },
        {
            "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
            "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
        },
        {
            "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
            "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
        },
        {
            "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
            "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
        },
        {
            "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
            "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
        },
        {
            "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
            "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
        },
        {
            "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
            "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
        },
        {
            "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
            "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
        },
        {
            "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
            "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
        },
        {
            "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
            "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
        },
        {
            "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
            "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
        },
        {
            "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
            "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
        },
        {
            "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
            "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
        },
        {
            "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
            "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
        },
        {
            "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
            "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
        },
        {
            "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
            "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
        },
        {
            "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
            "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
        },
        {
            "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
            "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
        },
        {
            "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
            "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
        },
        {
            "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
            "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
        },
        {
            "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
            "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
        },
        {
            "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
            "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
        },
        {
            "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
            "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
        },
        {
            "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
            "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
        },
        {
            "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
            "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
        },
        {
            "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
            "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
        },
        {
            "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
            "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
        },
        {
            "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
            "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
        },
        {
            "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
            "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
        },
        {
            "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
            "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
        },
        {
            "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
            "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
        },
        {
            "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
            "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
        },
        {
            "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
            "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
        },
        {
            "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
            "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
        },
        {
            "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
            "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
        },
        {
            "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
            "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
        }
    ]

    return relationShips.filter(item => item.follower === id).length;
}

const PROFILE_COUNTER1: ProfileCounter = {
    id: profiles_jsonData[0].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[0].id),
    following_counter: findFollowingOfId(profiles_jsonData[0].id),
    unread_notifications_counter: 0
}
const PROFILE_COUNTER2: ProfileCounter = {
    id: profiles_jsonData[1].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[1].id),
    following_counter: findFollowingOfId(profiles_jsonData[1].id),
    unread_notifications_counter: 0
}
const PROFILE_COUNTER3: ProfileCounter = {
    id: profiles_jsonData[2].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[2].id),
    following_counter: findFollowingOfId(profiles_jsonData[2].id),
    unread_notifications_counter: 0
}
const PROFILE_COUNTER4: ProfileCounter = {
    id: profiles_jsonData[3].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[3].id),
    following_counter: findFollowingOfId(profiles_jsonData[3].id),
    unread_notifications_counter: 0
}
const PROFILE_COUNTER5: ProfileCounter = {
    id: profiles_jsonData[4].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[4].id),
    following_counter: findFollowingOfId(profiles_jsonData[4].id),
    unread_notifications_counter: 0
}
const PROFILE_COUNTER6: ProfileCounter = {
    id: profiles_jsonData[5].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[5].id),
    following_counter: findFollowingOfId(profiles_jsonData[5].id),
    unread_notifications_counter: 0
}
const PROFILE_COUNTER7: ProfileCounter = {
    id: profiles_jsonData[6].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[6].id),
    following_counter: findFollowingOfId(profiles_jsonData[6].id),
    unread_notifications_counter: 0
}
const PROFILE_COUNTER8: ProfileCounter = {
    id: profiles_jsonData[7].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[7].id),
    following_counter: findFollowingOfId(profiles_jsonData[7].id),
    unread_notifications_counter: 0
}
const PROFILE_COUNTER9: ProfileCounter = {
    id: profiles_jsonData[8].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[8].id),
    following_counter: findFollowingOfId(profiles_jsonData[8].id),
    unread_notifications_counter: 0
}
const PROFILE_COUNTER10: ProfileCounter = {
    id: profiles_jsonData[9].id as string,
    follower_counter: findFollowerOfId(profiles_jsonData[9].id),
    following_counter: findFollowingOfId(profiles_jsonData[9].id),
    unread_notifications_counter: 0
}

export {
    PROFILE_COUNTER1,
    PROFILE_COUNTER2,
    PROFILE_COUNTER3,
    PROFILE_COUNTER4,
    PROFILE_COUNTER5,
    PROFILE_COUNTER6,
    PROFILE_COUNTER7,
    PROFILE_COUNTER8,
    PROFILE_COUNTER9,
    PROFILE_COUNTER10
};
