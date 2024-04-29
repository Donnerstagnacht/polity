import {SupabaseEnum} from "../../../../../supabase/types/supabase.shorthand-types";

export type GroupNew = {
    name: string;
    description: string;
    level: SupabaseEnum<'group_level'>;
    invited_members: string[];
}
