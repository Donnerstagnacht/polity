import {MergeDeep} from "type-fest";
import {Database as DatabaseGenerated} from './supabase.public'

/*
Supabase automatically generates types which are stored in the file supabase.ts.
Occasionally, these types are not equal to the database schema or the return of functions/database queries.
In these cases, the types can be overwritten in the type DatabaseOverwritten.
See: https://supabase.com/docs/reference/javascript/typescript-support

This seems to occur often with supabase real time.
Currently, overwritten types:
public - tables - profiles - row - updated_at
 */
export type DatabaseAuthenticatedOverwritten = MergeDeep<
    DatabaseGenerated,
    {
        public: {
            Tables: {
                profiles: {
                    Row: {
                        updated_at: Date | null
                    }
                    Insert: {
                        updated_at?: Date | null
                    }
                    Update: {
                        updated_at?: Date | null
                    }
                },
                profiles_counters: {
                    Row: {
                        id?: string
                        profile_id: string,
                        unread_notifications_counter: number
                    }
                    Insert: {
                        id?: string
                        profile_id: string,
                        unread_notifications_counter: number
                    }
                    Update: {
                        id?: string
                        profile_id?: string,
                        unread_notifications_counter: number
                    }
                }
                // notifications_by_user: {
                //     Row: {
                //         created_at: Date
                //     }
                //     Insert: {
                //         created_at?: Date
                //     }
                //     Update: {
                //         created_at?: Date
                //     }
                // }
            }
            // Functions: {
            //     select_notifications_of_users: {
            //         Args: {
            //             user_id: string
            //         }
            //         Returns: {
            //             type_of_notification: DatabaseGenerated["public"]["Enums"]["notifications_enum"]
            //             read_by_receiver: boolean
            //             created_at: string
            //             first_name: string
            //             last_name: string
            //             profile_image: string
            //         }[]
            //     }
            // }
        }
    }
>


