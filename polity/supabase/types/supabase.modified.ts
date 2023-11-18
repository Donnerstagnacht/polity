import {MergeDeep} from "type-fest";
import {Database as DatabaseGenerated} from './supabase'

export {Json} from './supabase'
export type DatabaseModified = MergeDeep<
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
                        profile_id: string
                    }
                    Insert: {
                        id?: string
                        profile_id: string
                    }
                    Update: {
                        id?: string
                        profile_id?: string
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
        }
    }
>
