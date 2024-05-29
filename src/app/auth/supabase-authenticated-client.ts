import {createClient} from '@supabase/supabase-js';
import {DatabaseOverwritten} from "../../../supabase/types/supabase.modified";
import {environment} from "../../environments/environment";

export const supabaseAuthenticatedClient =
    createClient<DatabaseOverwritten>(
        environment.supabaseProjectUrl,
        environment.supabaseAnonKey,
        {
            db: {
                schema: 'public',
            }
        }
    );
