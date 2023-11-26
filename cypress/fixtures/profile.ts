export type Profile = {
    id: string,
    username?: string | null,
    first_name: string | null,
    last_name: string | null,
    profile_image?: string | null,
    updated_at?: Date | null
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
