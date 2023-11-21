// // type NestedKeyOf<ObjectType extends object> =
// //     {
// //         [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
// //         ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
// //         : `${Key}`
// //     }[keyof ObjectType & (string | number)];
//
// // export interface DatabaseTest {
// //     public: {
// //         Tables: {
// //             assistants: {
// //                 Row: {
// //                     first_sign_in: boolean
// //                     id: string
// //                     last_tutorial: DatabaseTest["public"]["Enums"]["tutorial_enum"]
// //                     skip_tutorial: boolean
// //                 }
// //                 Insert: {
// //                     first_sign_in?: boolean
// //                     id: string
// //                     last_tutorial?: DatabaseTest["public"]["Enums"]["tutorial_enum"]
// //                     skip_tutorial?: boolean
// //                 }
// //                 Update: {
// //                     first_sign_in?: boolean
// //                     id?: string
// //                     last_tutorial?: DatabaseTest["public"]["Enums"]["tutorial_enum"]
// //                     skip_tutorial?: boolean
// //                 }
// //                 Relationships: [
// //                     {
// //                         foreignKeyName: "assistants_id_fkey"
// //                         columns: ["id"]
// //                         isOneToOne: true
// //                         referencedRelation: "users"
// //                         referencedColumns: ["id"]
// //                     }
// //                 ]
// //             }
// //             following_profiles: {
// //                 Row: {
// //                     follower: string
// //                     following: string
// //                 }
// //                 Insert: {
// //                     follower: string
// //                     following: string
// //                 }
// //                 Update: {
// //                     follower?: string
// //                     following?: string
// //                 }
// //                 Relationships: [
// //                     {
// //                         foreignKeyName: "following_profiles_follower_fkey"
// //                         columns: ["follower"]
// //                         isOneToOne: false
// //                         referencedRelation: "profiles"
// //                         referencedColumns: ["id"]
// //                     },
// //                     {
// //                         foreignKeyName: "following_profiles_following_fkey"
// //                         columns: ["following"]
// //                         isOneToOne: false
// //                         referencedRelation: "profiles"
// //                         referencedColumns: ["id"]
// //                     }
// //                 ]
// //             }
// //             notifications_by_user: {
// //                 Row: {
// //                     created_at: string
// //                     id: string
// //                     read_by_receiver: boolean
// //                     receiver: string
// //                     sender: string
// //                     type_of_notification: DatabaseTest["public"]["Enums"]["notifications_enum"]
// //                 }
// //                 Insert: {
// //                     created_at?: string
// //                     id?: string
// //                     read_by_receiver?: boolean
// //                     receiver: string
// //                     sender: string
// //                     type_of_notification?: DatabaseTest["public"]["Enums"]["notifications_enum"]
// //                 }
// //                 Update: {
// //                     created_at?: string
// //                     id?: string
// //                     read_by_receiver?: boolean
// //                     receiver?: string
// //                     sender?: string
// //                     type_of_notification?: DatabaseTest["public"]["Enums"]["notifications_enum"]
// //                 }
// //                 Relationships: [
// //                     {
// //                         foreignKeyName: "notifications_by_user_receiver_fkey"
// //                         columns: ["receiver"]
// //                         isOneToOne: false
// //                         referencedRelation: "users"
// //                         referencedColumns: ["id"]
// //                     },
// //                     {
// //                         foreignKeyName: "notifications_by_user_sender_fkey"
// //                         columns: ["sender"]
// //                         isOneToOne: false
// //                         referencedRelation: "users"
// //                         referencedColumns: ["id"]
// //                     }
// //                 ]
// //             }
// //             profiles: {
// //                 Row: {
// //                     first_name: string | null
// //                     fts: unknown | null
// //                     id: string
// //                     last_name: string | null
// //                     profile_image: string | null
// //                     receive_follow_notifications: boolean
// //                     updated_at: string | null
// //                     username: string | null
// //                 }
// //                 Insert: {
// //                     first_name?: string | null
// //                     fts?: unknown | null
// //                     id: string
// //                     last_name?: string | null
// //                     profile_image?: string | null
// //                     receive_follow_notifications?: boolean
// //                     updated_at?: string | null
// //                     username?: string | null
// //                 }
// //                 Update: {
// //                     first_name?: string | null
// //                     fts?: unknown | null
// //                     id?: string
// //                     last_name?: string | null
// //                     profile_image?: string | null
// //                     receive_follow_notifications?: boolean
// //                     updated_at?: string | null
// //                     username?: string | null
// //                 }
// //                 Relationships: [
// //                     {
// //                         foreignKeyName: "profiles_id_fkey"
// //                         columns: ["id"]
// //                         isOneToOne: true
// //                         referencedRelation: "users"
// //                         referencedColumns: ["id"]
// //                     }
// //                 ]
// //             }
// //             profiles_counters: {
// //                 Row: {
// //                     follower_counter: number
// //                     following_counter: number
// //                     id: string
// //                     unread_notifications_counter: number
// //                 }
// //                 Insert: {
// //                     follower_counter?: number
// //                     following_counter?: number
// //                     id: string
// //                     unread_notifications_counter?: number
// //                 }
// //                 Update: {
// //                     follower_counter?: number
// //                     following_counter?: number
// //                     id?: string
// //                     unread_notifications_counter?: number
// //                 }
// //                 Relationships: [
// //                     {
// //                         foreignKeyName: "profiles_counters_id_fkey"
// //                         columns: ["id"]
// //                         isOneToOne: true
// //                         referencedRelation: "profiles"
// //                         referencedColumns: ["id"]
// //                     }
// //                 ]
// //             }
// //         }
// //         Views: {
// //             [_ in never]: never
// //         }
// //         Functions: {
// //             check_if_following: {
// //                 Args: {
// //                     follower_id: string
// //                     following_id: string
// //                 }
// //                 Returns: boolean
// //             }
// //             create_notification_from_user_transaction: {
// //                 Args: {
// //                     sender: string
// //                     receiver: string
// //                     type_of_notification: string
// //                     read_by_receiver: boolean
// //                 }
// //                 Returns: undefined
// //             }
// //             follow_transaction: {
// //                 Args: {
// //                     follower_id: string
// //                     following_id: string
// //                 }
// //                 Returns: undefined
// //             }
// //             reset_notification_counter: {
// //                 Args: {
// //                     user_id: string
// //                 }
// //                 Returns: undefined
// //             }
// //             search_user: {
// //                 Args: {
// //                     search_term: string
// //                 }
// //                 Returns: {
// //                     first_name: string | null
// //                     fts: unknown | null
// //                     id: string
// //                     last_name: string | null
// //                     profile_image: string | null
// //                     receive_follow_notifications: boolean
// //                     updated_at: string | null
// //                     username: string | null
// //                 }[]
// //             }
// //             select_assistant: {
// //                 Args: {
// //                     user_id: string
// //                 }
// //                 Returns: {
// //                     id: string
// //                     first_sign_in: boolean
// //                     skip_tutorial: boolean
// //                     last_tutorial: DatabaseTest["public"]["Enums"]["tutorial_enum"]
// //                 }[]
// //             }
// //             select_follower_of_user: {
// //                 Args: {
// //                     following_id: string
// //                 }
// //                 Returns: {
// //                     id: string
// //                     first_name: string
// //                     last_name: string
// //                 }[]
// //             }
// //             select_following_counter: {
// //                 Args: {
// //                     user_id: string
// //                 }
// //                 Returns: {
// //                     profile_id: string
// //                     follower_counter: number
// //                     following_counter: number
// //                     unread_notifications_counter: number
// //                 }[]
// //             }
// //             select_following_of_user: {
// //                 Args: {
// //                     follower_id: string
// //                 }
// //                 Returns: {
// //                     id: string
// //                     first_name: string
// //                     last_name: string
// //                 }[]
// //             }
// //             select_notifications_of_users: {
// //                 Args: {
// //                     user_id: string
// //                 }
// //                 Returns: {
// //                     id: string
// //                     sender: string
// //                     receiver: string
// //                     type_of_notification: DatabaseTest["public"]["Enums"]["notifications_enum"]
// //                     read_by_receiver: boolean
// //                     created_at: string
// //                 }[]
// //             }
// //             unfollow_transaction: {
// //                 Args: {
// //                     follower_id: string
// //                     following_id: string
// //                 }
// //                 Returns: undefined
// //             }
// //             update_first_sign_in: {
// //                 Args: {
// //                     user_id: string
// //                     new_status: boolean
// //                 }
// //                 Returns: undefined
// //             }
// //             update_last_tutorial: {
// //                 Args: {
// //                     user_id: string
// //                     new_status: DatabaseTest["public"]["Enums"]["tutorial_enum"]
// //                 }
// //                 Returns: undefined
// //             }
// //             update_receive_notifications_from_follow: {
// //                 Args: {
// //                     user_id: string
// //                     new_status: boolean
// //                 }
// //                 Returns: undefined
// //             }
// //             update_skip_tutorial: {
// //                 Args: {
// //                     user_id: string
// //                     new_status: boolean
// //                 }
// //                 Returns: undefined
// //             }
// //         }
// //         Enums: {
// //             notifications_enum: "follow_from_user"
// //             tutorial_enum: "welcome" | "profile" | "search"
// //         }
// //         CompositeTypes: {
// //             [_ in never]: never
// //         }
// //     }
// // }
// //
// // export type TablesTest<T extends keyof DatabaseTest['public']['Tables']> = DatabaseTest['public']['Tables'][T]['Row']
// // export type EnumsTest<T extends keyof DatabaseTest['public']['Enums']> = DatabaseTest['public']['Enums'][T]
// // export type FunctionsTest<T extends keyof DatabaseTest['public']['Functions']> = DatabaseTest['public']['Functions'][T]['Returns']
//
// // type NestedKeyOf<T, K = keyof T> = K extends keyof T & (string | number)
// //     ? `${K}` | (T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : never)
// //     : never
// // type NestedKeyOf<T, K = keyof T> = K extends keyof T & (string | number)
// //     ? `${K}` | (T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : never)
// //     : never
//
// // type NestedKeyOf<ObjectType extends object> =
// //     {
// //         [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
// //         ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
// //         : `${Key}`
// //     }[keyof ObjectType & (string | number)];
//
// import {ProfileStatistics} from "../../features/profile/types-and-interfaces/profile-statistics";
//
// export interface DatabaseTest {
//     public: {
//         Tables: {
//             profiles_counters: {
//                 Row: {
//                     follower_counter: number
//                     following_counter: number
//                     id: string
//                     unread_notifications_counter: number
//                 }
//                 Insert: {
//                     follower_counter?: number
//                     following_counter?: number
//                     id: string
//                     unread_notifications_counter?: number
//                 }
//                 Update: {
//                     follower_counter?: number
//                     following_counter?: number
//                     id?: string
//                     unread_notifications_counter?: number
//                 }
//                 Relationships: [
//                     {
//                         foreignKeyName: "profiles_counters_id_fkey"
//                         columns: ["id"]
//                         isOneToOne: true
//                         referencedRelation: "profiles"
//                         referencedColumns: ["id"]
//                     }
//                 ]
//             }
//         }
//     }
// }
//
// export type TablesTest<T extends keyof DatabaseTest['public']['Tables']> = DatabaseTest['public']['Tables'][T]['Row']
//
// export type ProfileStatisticsTest = {
//     counters?: TablesTest<'profiles_counters'>,
// }
//
// const counter: ProfileStatisticsTest = {
//     counters: {
//         follower_counter: 0,
//         following_counter: 0,
//         id: "1",
//         unread_notifications_counter: 0,
//     }
// }
//
// const tableTest: TablesTest<'profiles_counters'> = {
//     follower_counter: 0,
//     following_counter: 0,
//     id: "1",
//     unread_notifications_counter: 0,
// }
//
// // type NestedKeyOf<ObjectType extends object> =
// //     {
// //         [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object | TablesTest<ObjectType extends keyof DatabaseTest['public']['Tables']>
// //         ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
// //         : `${Key}`
// //     }[keyof ObjectType & (string | number)];
//
// type NestedKeyOf4aOriginal<ObjectType, KeysOfObjectType extends string[] = []> =
//     ObjectType extends object
//         ? {
//             [key in keyof ObjectType & (string)]: key | `${key}.${NestedKeyOf4a<ObjectType[key], [...KeysOfObjectType, key]>}`
//         }[keyof ObjectType & (string)]
//         : KeysOfObjectType[number];
//
// type NestedKeyOf4b<ObjectType, KeysOfObjectType extends string[] = []> =
//     ObjectType extends object
//         ? {
//             [key in keyof ObjectType & (string)]: key | `${key}.${NestedKeyOf4b<ObjectType[key], [...KeysOfObjectType, key]>}`
//         }[keyof ObjectType & (string)]
//         : KeysOfObjectType[number];
//
//
// const dog2 = {
//     owner: {
//         address: "1"
//     },
//     name: "2",
// }
//
// type ObjectPaths<T> = T extends object
//     ? {
//         [K in keyof T & string]: K | `${K}.${ObjectPaths<T[K]>}`;
//     }[keyof T & string]
//     : never;
//
// type ObjectPaths3<T> = T extends Record<string, unknown>
//     ? {
//         [K in keyof T & string]: K | `${K}.${ObjectPaths3<T[K]>}`;
//     }[keyof T & string]
//     : never;
//
// type NestedKey9<O extends Record<string, unknown>> = {
//     [K in Extract<keyof O, string>]: O[K] extends Array<any>
//         ? K
//         : O[K] extends Record<string, unknown>
//             ? `${K}` | `${K}.${NestedKey9<O[K]>}`
//             : K
// }[Extract<keyof O, string>]
//
// type ObjectPaths4<T> = T extends Record<string, unknown>
//     ? T extends Array<any>
//         ? `${number & string}`[keyof T & string]
//         // Handle arrays differently, you can adjust this based on your needs
//         : {
//             [K in keyof T & string]: K | `${K}.${ObjectPaths3<T[K]>}`;
//         }[keyof T & string]
//     : never;
//
//
// type NestedKey<O extends Record<string, unknown>> = {
//     [K in Extract<keyof O, string>]: O[K] extends Array<any>
//         ? K
//         : O[K] extends Record<string, unknown>
//             ? `${K}` | `${K}.${NestedKey<O[K]>}`
//             : K
// }[Extract<keyof O, string>];
//
//
// type NestedKeyOf4a<ObjectType, KeysOfObjectType extends string[] = []> =
//     ObjectType extends object
//         ? {
//             [key in keyof ObjectType & (string)]: key | `${key}.${NestedKeyOf4a<ObjectType[key], [...KeysOfObjectType, key]>}`
//         }[keyof ObjectType & (string)]
//         : KeysOfObjectType[number];
//
// class PersonClass2<T extends Record<string, unknown>> {
//     object: T | null = null;
//
//     constructor() {
//     }
//
//     sortB(sortingAttribute: ObjectPaths3<T>): void {
//     }
// }
//
// type dog2 = {
//     owner: {
//         address: string
//     }
//     name: string,
// }
// const class2 = new PersonClass2<dog2>();
// class2.sortB('owner.address')
//
// function getAllKeysRecursive(obj: Record<string, any>): string[] {
//     let keys: string[] = [];
//
//     for (const key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             keys.push(key);
//
//             if (typeof obj[key] === 'object' && obj[key] !== null) {
//                 // Recursively get keys for nested objects
//                 keys = keys.concat(getAllKeysRecursive(obj[key]));
//             }
//         }
//     }
//     console.log(keys)
//     return keys;
// }
//
// const nestedObject = {
//     name: "John",
//     age: 25,
//     address: {
//         city: "New York",
//         postalCode: "10001"
//     }
// };
//
// const keysArray = getAllKeysRecursive(nestedObject);
// console.log(keysArray);
//
//
// // Type hint results for sortB:
// // "owner" -> correct 1
// // "name" -> correct
// // "owner.address" -> correct
// // "owner.address.owner" -> false, this is not a valid key for the object dog2
// // "owner.address.address" -> false, this is not a valid key for the object dog2
// // "name.name" -> false, this is not a valid key for the object dog2
//
//
// // const class1 = new PersonClass2<TablesTest<'profiles_counters'>>();
// // class1.sortB('follower_counter')
// //
// // const class3 = new PersonClass2<dog2>();
// // class3.sortB('owner.address')
// // class3.sortA('name')
// //
// // //TODO: Why do I not get type hints for 'counters.following_counter'?
// const class4 = new PersonClass2<ProfileStatisticsTest>();
// class4.sortB('counters.id')
// class4.sortA('counters')
//
// const class6 = new PersonClass2<ProfileStatistics>();
// class6.sortB('cou')
// class6.sortA('counters')
//
//
// type NestedKeyOf7<ObjectType extends object> =
//     {
//         [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
//         ? `${Key}` | `${Key}.${NestedKeyOf7<ObjectType[Key]>}`
//         : `${Key}`
//     }[keyof ObjectType & (string | number)];
//
// type NestedKeyOf8<ObjectType extends object, KeysOfObjectType extends string[] = []> =
//     {
//         [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
//         ? `${Key}` | `${Key}.${NestedKeyOf8<ObjectType[Key], [...KeysOfObjectType, `${Key}`]>}`
//         : `${Key}`
//     }[keyof ObjectType & (string | number)];
//
// type dog = {
//     name: string,
//     age: number,
//     owner: {
//         name: string,
//         address: string
//     }
// }
//
//
