import {ProfileTest} from "./profile";

// A user created by a cypress auth test
export const userCreatedByCypress: ProfileTest = {
    id: '',
    first_name: 'Fabian',
    last_name: 'Bäcker',
    name: '',
    email: 'user1@seed.com',
    password: "12345678",
    about: '',
    contactEmail: '',
    contactPhone: '',
    street: '',
    postCode: '',
    city: '',
    ftsName: '',
    profile_image: '',
    username: '',
    follower_counter: 1,
    following_counter: 2,
    follower: [],
    following: [],
    is_following: false,
    profile_id: ''
}

// A user to view
export const seedReadUser2: ProfileTest = {
    id: '',
    first_name: 'Fabian',
    last_name: 'Bäcker',
    name: '',
    email: 'user2@seed.com',
    password: '12345678',
    about: '',
    contactEmail: '',
    contactPhone: '',
    street: '',
    postCode: '',
    city: '',
    ftsName: '',
    profile_image: '',
    username: '',
    follower_counter: 1,
    following_counter: 2,
    follower: [],
    following: [],
    is_following: false,
    profile_id: ''
}

// A user to view
export const seedReadUser3: ProfileTest = {
    id: '',
    first_name: 'Tobias',
    last_name: 'Müller',
    name: '',
    email: 'user3@cypress.com',
    password: '12345678',
    about: '',
    contactEmail: '',
    contactPhone: '',
    street: '',
    postCode: '',
    city: '',
    ftsName: '',
    profile_image: '',
    username: '',
    follower_counter: 1,
    following_counter: 2,
    follower: [],
    following: [],
    is_following: false,
    profile_id: ''
}

// A user to edit its own data
export const seedWriteUser: ProfileTest = {
    id: '',
    first_name: 'Lars',
    last_name: 'Berg',
    name: '',
    email: 'edit1@seed.com',
    password: '12345678',
    about: '',
    contactEmail: '',
    contactPhone: '',
    street: '',
    postCode: '',
    city: '',
    ftsName: '',
    profile_image: '',
    username: '',
    follower_counter: 1,
    following_counter: 2,
    follower: [],
    following: [],
    is_following: false,
    profile_id: ''
}

// A user to test follow actions
export const seedProfileFollowUser: ProfileTest = {
    id: '',
    first_name: 'Jana',
    last_name: 'Klein',
    name: '',
    email: 'follow@seed.com',
    password: '12345678',
    about: '',
    contactEmail: '',
    contactPhone: '',
    street: '',
    postCode: '',
    city: '',
    ftsName: '',
    profile_image: '',
    username: '',
    follower_counter: 1,
    following_counter: 2,
    follower: [],
    following: [],
    is_following: false,
    profile_id: ''
}

// A user to test unfollow actions
export const seedProfileFollowingUser: ProfileTest = {
    id: '',
    first_name: 'Lennart',
    last_name: 'Lieb',
    name: '',
    email: 'unfollow@seed.com',
    password: '12345678',
    about: '',
    contactEmail: '',
    contactPhone: '',
    street: '',
    postCode: '',
    city: '',
    ftsName: '',
    profile_image: '',
    username: '',
    follower_counter: 1,
    following_counter: 2,
    follower: [],
    following: [],
    is_following: false,
    profile_id: ''
}
