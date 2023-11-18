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
