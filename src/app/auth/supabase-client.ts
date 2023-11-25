import {createClient, PostgrestError} from '@supabase/supabase-js';
import {DatabaseOverwritten} from "../../../supabase/types/supabase.modified";
import {environment} from "../../environments/environment";

export const supabaseClient = createClient<DatabaseOverwritten>(environment.supabaseUrl, environment.supabaseKey);

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = PostgrestError
