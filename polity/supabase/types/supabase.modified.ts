import {MergeDeep} from "type-fest";
import {Database as DatabaseGenerated} from './supabase'

export {Json} from './supabase'
export type Database = MergeDeep<
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

                }
            }
        }
    }
>
