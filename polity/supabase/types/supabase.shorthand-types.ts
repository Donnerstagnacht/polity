import {DatabaseModified} from "./supabase.modified";
import {PostgrestError} from "@supabase/supabase-js";

export type Tables<T extends keyof DatabaseModified['public']['Tables']> = DatabaseModified['public']['Tables'][T]['Row']
export type Enums<T extends keyof DatabaseModified['public']['Enums']> = DatabaseModified['public']['Enums'][T]
export type Functions<T extends keyof DatabaseModified['public']['Functions']> = DatabaseModified['public']['Functions'][T]['Returns']
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = PostgrestError
