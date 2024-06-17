import {Injectable} from '@angular/core';
import {supabaseAuthenticatedClient} from "../auth/supabase-authenticated-client";
import {
    AuthenticatedSchema,
    SupabaseAuthenticatedFunctionArgs,
    SupabaseAuthenticatedFunctionName,
    SupabaseObjectReturn
} from "../../../supabase/types/supabase.authenticated.shorthand-types";
import {PostgrestSingleResponse} from "@supabase/supabase-js";

import {PostgrestFilterBuilder, PostgrestResponseFailure, PostgrestResponseSuccess} from '@supabase/postgrest-js'

import {DatabaseAuthenticatedOverwritten} from "../../../supabase/types/supabase.authenticated.modified";

@Injectable({
    providedIn: 'root'
})
export class AbstractRpcService {
    private supabaseClient = supabaseAuthenticatedClient;


    constructor() {
    }

    public async abstractRpc(
        fn: SupabaseAuthenticatedFunctionName,
        args: SupabaseAuthenticatedFunctionArgs = {},
        options?: {
            head?: boolean
            count?: 'exact' | 'planned' | 'estimated'
        }
    ): Promise<PostgrestSingleResponse<SupabaseObjectReturn<SupabaseAuthenticatedFunctionName>[]>> {
        const test = await this.supabaseClient.rpc<
            SupabaseAuthenticatedFunctionName,
            {
                Args: any;
                Returns: any
            }
        >(
            fn, args, options
        )
        return test;
    }

    public async abstractRpc2(
        fn: keyof DatabaseAuthenticatedOverwritten['authenticated']['Functions'],
        args: DatabaseAuthenticatedOverwritten['authenticated']['Functions'][SupabaseAuthenticatedFunctionName]['Args'] = {},
        options?: {
            head?: boolean
            count?: 'exact' | 'planned' | 'estimated'
        }
    ): Promise<PostgrestSingleResponse<SupabaseObjectReturn<SupabaseAuthenticatedFunctionName>[]>> {
        const test = await this.supabaseClient.rpc<
            SupabaseAuthenticatedFunctionName,
            {
                Args: any;
                Returns: any
            }
        >(
            fn, args, options
        )
        return test;
    }


    public async searcUser(searchTerm: string): Promise<PostgrestSingleResponse<SupabaseObjectReturn<'search_user'>[]>> {
        const test = await this.supabaseClient.rpc<
            'search_user',
            {
                Args: { _search_term: string; };
                Returns: { id_: string; first_name_: string; last_name_: string; username_: string; }[];
            }
        >(
            'search_user',
            {_search_term: searchTerm}
        )
        return test;
    }

    // public async searcUser2(
    //     fn: SupabaseAuthenticatedFunctionName,
    //     searchTerm: string
    // ): Promise<PostgrestSingleResponse<SupabaseObjectReturn<'search_user'>[]>> {
    //     const test = await this.supabaseClient.rpc(
    //         fn,
    //         {_search_term: searchTerm}
    //     )
    //     return test;
    // }

    public async acceptGroupInvitation(id: string) {
        const test = await this.supabaseClient.rpc<
            'check_group_membership_status',
            {
                Args: DatabaseAuthenticatedOverwritten['authenticated']['Functions']['check_group_membership_status']['Args']
                Returns: DatabaseAuthenticatedOverwritten['authenticated']['Functions']['check_group_membership_status']['Returns']
            }
        >(
            'check_group_membership_status',
            {_group_id: id}
        )
        return test;
    }

    public async acceptGroupInvitation2(id: string) {
        const test = await this.supabaseClient.rpc<
            'check_group_membership_status',
            {
                Args: DatabaseAuthenticatedOverwritten['authenticated']['Functions']['check_group_membership_status']['Args']
                Returns: DatabaseAuthenticatedOverwritten['authenticated']['Functions']['check_group_membership_status']['Returns']
            }
        >(
            'check_group_membership_status',
            {_group_id: id}
        )
        return test;
    }

    public abstractRpc3<
        FunctionName extends string & keyof AuthenticatedSchema['Functions'],
        Function_ extends AuthenticatedSchema['Functions'][FunctionName]
    >(
        fn: FunctionName,
        args: Function_['Args'] = {} as Function_['Args'],
        options?: {
            head?: boolean;
            count?: 'exact' | 'planned' | 'estimated';
        }
    ): PostgrestFilterBuilder<
        AuthenticatedSchema,
        Function_['Returns'] extends any[]
            ? Function_['Returns'][number] extends Record<string, unknown>
                ? Function_['Returns'][number]
                : never
            : never,
        Function_['Returns']
    > {
        return this.supabaseClient.rpc(fn, args, options);
    }

    public async abstractRpc4<
        FunctionName extends string & keyof AuthenticatedSchema['Functions'],
        Function_ extends AuthenticatedSchema['Functions'][FunctionName]
    >(
        fn: FunctionName,
        args: Function_['Args'] = {} as Function_['Args'],
        options?: {
            head?: boolean;
            count?: 'exact' | 'planned' | 'estimated';
        }
    ) {
        const test = await this.supabaseClient.rpc(fn, args, options);
        return test;
    }

    public async abstractRpc6<
        FunctionName extends string & keyof AuthenticatedSchema['Functions'],
        Function_ extends AuthenticatedSchema['Functions'][FunctionName]
    >(
        fn: FunctionName,
        args: Function_['Args'] = {} as Function_['Args'],
        options?: {
            head?: boolean;
            count?: 'exact' | 'planned' | 'estimated';
        }
    ): Promise<PostgrestResponseSuccess<AuthenticatedSchema["Functions"][FunctionName]["Returns"]> | PostgrestResponseFailure> {
        const test = await this.supabaseClient.rpc(fn, args, options);
        return test;
    }


}
