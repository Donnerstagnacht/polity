import {AuthenticatedSchema} from '../../../supabase/types/supabase.authenticated.shorthand-types';
import {PostgrestResponseFailure, PostgrestResponseSuccess} from '@supabase/postgrest-js';
import {DatabaseAuthenticatedOverwritten} from '../../../supabase/types/supabase.authenticated.modified';
import {supabaseAuthenticatedClient} from '../../app/auth/supabase-authenticated-client';

/**
 * Executes a remote procedure call (RPC) to a Supabase authenticated function.
 *
 * @param {string & keyof AuthenticatedSchema['Functions']} fn - The name of the Supabase authenticated function to call.
 * @param {Function_['Args']} [args={}] - The arguments to pass to the function. Defaults to an empty object.
 * @param {{ head?: boolean; count?: 'exact' | 'planned' | 'estimated'; }} [options] - Optional parameters for the RPC call.
 * @return {Promise<PostgrestResponseSuccess<DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns']> | PostgrestResponseFailure>} - A Promise that resolves to the result of the RPC call.
 */
export async function rpcArray<
    FunctionName extends string & keyof AuthenticatedSchema['Functions'],
    Function_ extends AuthenticatedSchema['Functions'][FunctionName]
>(
    fn: FunctionName,
    args: Function_['Args'] = {},
    options?: {
        head?: boolean
        count?: 'exact' | 'planned' | 'estimated'
    }
): Promise<PostgrestResponseSuccess<DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns']> | PostgrestResponseFailure> {

    const client = supabaseAuthenticatedClient;
    let rpcReturn: PostgrestResponseSuccess<DatabaseAuthenticatedOverwritten['authenticated']['Functions'][FunctionName]['Returns']> | PostgrestResponseFailure = await client.rpc(fn, args, options);
    return rpcReturn;
}
