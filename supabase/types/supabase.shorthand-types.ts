import {DatabaseOverwritten} from "./supabase.modified";
// import {PostgrestError} from "@supabase/supabase-js";

/**
 * The Generated Database return types are of type array if the postgres database function returns a table.
 * The used generic stores for arrays in this project only generate type support, if they are initialized as object and
 * then the store creates an array of objects based on the given object.
 *
 * Therefore, the project requires a helper type which strips all function return types of their array extension and
 * returns the actual object type.
 *
 * Type ArrayElement is providing this feature. The type guard is removed, since
 * DatabaseGenerated['public']['Functions']['T']['Returns'] are not always arrays (in the case of functions that
 * return just a single row)
 *
 * @see https://stackoverflow.com/questions/41253310/typescript-retrieve-element-type-information-from-array-type
 **/
type ArrayElement<ArrayType> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
type ArrayElementWithTypeGuard<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/**
 * Generic type that takes a database function in and returns the function's return type as plain object type.
 * @example
 * If a postgres function "find_user()" returns
 *
 * RETURNS table (
 *   id: string,
 *   name: string
 * )
 *
 * supabase-JS generated types will be
 *
 * {
 *   id: string,
 *   name: string
 * }[]
 *
 * and the PlainFunctions<'find_user'> will be without the array tag
 *
 * {
 *   id: string,
 *   name: string
 * }
 */
export type FunctionSingleReturn<T extends keyof DatabaseOverwritten['public']['Functions']> = ArrayElement<DatabaseOverwritten['public']['Functions'][T]['Returns']>;

/**
 * Abstract type that represents the return of a supabase-js call
 */
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never

/**
 * Abstract type that represents the returned data of a successful supabase-js call
 */
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never

/**
 * Abstract type that represents the returned postgres of a unsuccessful supabase-js call
 */
// export type DbResultErr = PostgrestError

/**
 * Type that represents the definition of a postgres table in the database as typescript object.
 * @example
 * If a database table is defined as
 *
 * table (
 *   id: string,
 *   name: string
 * )
 *
 * supabase-JS generated types will be
 *
 * {
 *   id: string,
 *   name: string
 * }
 */
export type Tables<T extends keyof DatabaseOverwritten['public']['Tables']> = DatabaseOverwritten['public']['Tables'][T]['Row']
/**
 * Type that represents the return of a postgres function as array.
 * @example
 * If a postgres function "find_user()" returns
 *
 * RETURNS table (
 *   id: string,
 *   name: string
 * )
 *
 * supabase-JS generated types will be
 *
 * {
 *   id: string,
 *   name: string
 * }[]
 */
export type FunctionTableReturn<T extends keyof DatabaseOverwritten['public']['Functions']> = DatabaseOverwritten['public']['Functions'][T]['Returns']

export type Enums<T extends keyof DatabaseOverwritten['public']['Enums']> = DatabaseOverwritten['public']['Enums'][T]

export type FunctionName = keyof DatabaseOverwritten['public']['Functions']

