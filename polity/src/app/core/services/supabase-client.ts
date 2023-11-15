import {createClient, PostgrestError} from '@supabase/supabase-js';
import {environment} from "../../../environments/environment";
import {Database} from "../../../../supabase/types/types";

export const supabaseClient = createClient<Database>(environment.supabaseUrl, environment.supabaseKey);

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = PostgrestError
