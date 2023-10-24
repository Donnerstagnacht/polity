export type Profile = {
    id?: string
    username?: string
    first_name?: string,
    last_name?: string,
    website?: string
    avatar_url?: string
    profileImage?: string
}

export type  ProfileProperties = {
    profile: Profile | null;
}
