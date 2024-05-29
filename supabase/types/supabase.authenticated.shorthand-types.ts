import {DatabaseHiddenOverwritten} from "./supabase.authenticated.modified";

// Commonly used types
// from functions
/**
 * Type that represents the table return of a postgres function as object e.g. a single row. If the postgres
 * function does not return a table, it simply returns the return type directly
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
 *
 * It can be used to create an array of objects using typescript array notation:
 * protected notifications: WritableSignal<SupabaseObjectReturn<'select_notifications_of_users'>[]> = signal([]);
 * */
export type SupabaseObjectReturn<T extends keyof DatabaseHiddenOverwritten['authenticated']['Functions']> =
    DatabaseHiddenOverwritten['authenticated']['Functions'][T] extends { Returns: infer R } // Infer the return type
        ? R extends any[] // Check if the return type is an array
            ? R[number]  // In case 'Returns' is an array, infer the element type
            : R          // Otherwise, infer the return type directly
        : never;
/**
 * Type that represents the table return of a postgres function as array. If the postgres function is not returning a table,
 * then it returns the return type directly
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
// export type SupabaseReturn<T extends keyof DatabaseOverwritten['authenticated']['Functions']> =
//     DatabaseOverwritten['authenticated']['Functions'][T]['Returns']


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
export type SupabaseTable<T extends keyof DatabaseHiddenOverwritten['authenticated']['Tables']> = DatabaseHiddenOverwritten['authenticated']['Tables'][T]['Row']

/**
 *  Type that represents the definition of an enum in the database as typescript object.
 *  @example
 *  If a database enum is defined as "group_level", it should be used as SupabaseEnum<'group_level'>
 */
export type SupabaseEnum<T extends keyof DatabaseHiddenOverwritten['authenticated']['Enums']> = DatabaseHiddenOverwritten['authenticated']['Enums'][T];

/**
 *  Type that represents the definition of a postgres composite type in the database as typescript object.
 *  @example
 *  If a database composite type is defined as
 *
 *  CREATE TYPE delete_group AS
 * (
 *     group_id  uuid,
 *     member_id uuid
 * );
 *
 * the typescript type will be:
 * SupabaseCompositeType<'delete_group'> = {
 *     group_id: string
 *     member_id: string
 * }
 */
export type SupabaseCompositeType<T extends keyof DatabaseHiddenOverwritten['authenticated']['CompositeTypes']> = DatabaseHiddenOverwritten['authenticated']['CompositeTypes'][T];

/**
 *  Type that represents the names of postgres functions - e.g. database calls.
 *  The main useage is make cypress api calls/interceptions type safe.
 *  @example see cypress commands.ts file
 */
export type SupabaseFunctionName = keyof DatabaseHiddenOverwritten['authenticated']['Functions']

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
 * DatabaseGenerated['authenticated']['Functions']['T']['Returns'] are not always arrays (in the case of functions that
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


// old types
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
// export type SupabaseArrayReturnConditional<T extends keyof DatabaseOverwritten['authenticated']['Functions']> =
//     SupabaseArrayElement<DatabaseOverwritten['authenticated']['Functions'][T]['Returns']>;

