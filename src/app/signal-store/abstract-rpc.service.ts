import {Injectable} from '@angular/core';
import {supabaseAuthenticatedClient} from "../auth/supabase-authenticated-client";
import {
    SupabaseAutehnticatedFunctionArgs,
    SupabaseAuthenticatedFunctionName
} from "../../../supabase/types/supabase.authenticated.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class AbstractRpcService {
    private supabaseClient = supabaseAuthenticatedClient;


    constructor() {
    }

    public abstractRpc(
        fn: SupabaseAuthenticatedFunctionName,
        args: SupabaseAutehnticatedFunctionArgs = {},
        options?: {
            head?: boolean
            count?: 'exact' | 'planned' | 'estimated'
        }
    ) {
        return this.supabaseClient.rpc(
            fn, args, options
        )
    }
}
