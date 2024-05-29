import {createClient} from '@supabase/supabase-js';
import {DatabaseAuthenticatedOverwritten} from "../../../supabase/types/supabase.public.modified";
import {environment} from "../../environments/environment";

export const supabasePublicClient =
    createClient<DatabaseAuthenticatedOverwritten>(
        environment.supabaseProjectUrl,
        environment.supabaseAnonKey,
        {
            db: {
                schema: 'public',
            }
        }
    );
