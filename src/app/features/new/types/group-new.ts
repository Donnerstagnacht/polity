import {DatabaseHiddenOverwritten} from "../../../../../supabase/types/supabase.hidden.modified";

export type GroupNew = {
    name: string;
    description: string;
    level: DatabaseHiddenOverwritten["hidden"]["Enums"]["group_level"];
    invited_members: string[];
}
