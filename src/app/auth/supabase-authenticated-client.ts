import {createClient} from '@supabase/supabase-js';
import {DatabasePublicOverwritten} from "../../../supabase/types/supabase.public.modified";
import {environment} from "../../environments/environment";

export const supabaseAuthenticatedClient =
    createClient<DatabasePublicOverwritten>(
        environment.supabaseProjectUrl,
        environment.supabaseAnonKey,
        {
            db: {
                schema: 'public',
            }
        }
    );
