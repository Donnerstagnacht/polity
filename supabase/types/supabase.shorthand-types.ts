import {DatabaseOverwritten} from "./supabase.modified";

// Commonly used types
// from functions
/**
 * Type that represents the table return of a postgres function as array. It assumes that the return from the
 * postgres function can include multiple rows
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
export type SupabaseArrayReturn<T extends keyof DatabaseOverwritten['public']['Functions']> =
    DatabaseOverwritten['public']['Functions'][T]['Returns']

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
 * supabase-JS generated types will be an array of objects
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
export type SupabaseArrayReturnConditional<T extends keyof DatabaseOverwritten['public']['Functions']> =
    SupabaseArrayElement<DatabaseOverwritten['public']['Functions'][T]['Returns']>;

/**
 * Type that represents the table return of a postgres function as object e.g. a single row. It assumes that the
 * return from the postgres function can only include one row
 * @example
 * If a postgres function "find_user()" returns
 *
 * RETURNS table (
 *   id: string,
 *   name: string
 * )
 *
 * supabase-JS generated types will be a single object
 *
 * {
 *   id: string,
 *   name: string
 * }
 * even this is not indicated by hovering on the [T]
 * */
export type SupabaseObjectReturn<T extends keyof DatabaseOverwritten['public']['Functions']> =
    DatabaseOverwritten['public']['Functions'][T] extends { Returns: (infer R)[] }
        ? R
        : never;


// other postgres objects
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
export type SupabaseTable<T extends keyof DatabaseOverwritten['public']['Tables']> = DatabaseOverwritten['public']['Tables'][T]['Row']

/**
 *  Type that represents the definition of an enum in the database as typescript object.
 *  @example
 *  If a database enum is defined as "group_level", it should be used as SupabaseEnum<'group_level'>
 */
export type SupabaseEnum<T extends keyof DatabaseOverwritten['public']['Enums']> = DatabaseOverwritten['public']['Enums'][T];


// helper types - used in SupabaseArrayReturn type
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
type SupabaseArrayElement<ArrayType> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;


// rarely used types
/**
 * Abstract type that represents the return of a supabase-js call
 */
export type SupabaseResult<T> = T extends PromiseLike<infer U> ? U : never

/**
 * Abstract type that represents the returned data of a successful supabase-js call
 */
export type SupabaseResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never



