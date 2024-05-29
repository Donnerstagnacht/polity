import {MergeDeep} from "type-fest";
import {Database as DatabaseGenerated} from './supabase.hidden'

/*
Supabase automatically generates types which are stored in the file supabase.ts.
Occasionally, these types are not equal to the database schema or the return of functions/database queries.
In these cases, the types can be overwritten in the type DatabaseOverwritten.
See: https://supabase.com/docs/reference/javascript/typescript-support

This seems to occur often with supabase real time.
Currently, overwritten types:
public - tables - profiles - row - updated_at
 */
export type DatabaseHiddenOverwritten = MergeDeep<
    DatabaseGenerated,
    {}
>


