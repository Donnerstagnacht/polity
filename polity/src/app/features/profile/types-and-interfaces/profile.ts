export type Profile = {
    id: string,
    username?: string,
    first_name: string,
    last_name: string,
    profile_image?: string,
    updated_at?: Date
}

export interface ProfileTest extends Profile {
    password: string,
    email: string,
    name: string,
    about: string,
    contactEmail: string,
    contactPhone: string,
    street: string,
    postCode: string,
    city: string,
    ftsName: string,
    follower_counter: number,
    following_counter: number,
    follower: ProfileMin[],
    following: ProfileMin[],
    is_following: boolean,
    profile_id: string
}

export type ProfileMin = {
    id: string
    first_name: string,
    last_name: string,
    profile_image?: string
}
