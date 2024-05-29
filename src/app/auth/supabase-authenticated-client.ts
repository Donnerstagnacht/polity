import {createClient} from '@supabase/supabase-js';
import {environment} from "../../environments/environment";
import {DatabaseHiddenOverwritten} from "../../../supabase/types/supabase.authenticated.modified";

export const supabaseAuthenticatedClient =
    createClient<DatabaseHiddenOverwritten>(
        environment.supabaseProjectUrl,
        environment.supabaseAnonKey,
        {
            db: {
                schema: 'authenticated',
            }
        }
    );
