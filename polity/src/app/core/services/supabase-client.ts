import {createClient} from '@supabase/supabase-js';
import {environment} from "../../../environments/environment";

const client = createClient(environment.supabaseUrl, environment.supabaseKey);

const supabaseClient = () => client;

export default supabaseClient;
