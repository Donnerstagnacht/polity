import {createClient} from '@supabase/supabase-js';
import {environment} from "../../environments/environment";
import {DatabaseAuthenticatedOverwritten} from "../../../supabase/types/supabase.authenticated.modified";

export const supabaseAuthenticatedClient =
    createClient<DatabaseAuthenticatedOverwritten>(
        environment.supabaseProjectUrl,
        environment.supabaseAnonKey,
        {
            db: {
                schema: 'authenticated',
            }
        }
    );
