import {Injectable} from '@angular/core';
import {
  AuthChangeEvent,
  createClient,
  Session,
  SignInWithPasswordCredentials,
  SupabaseClient
} from "@supabase/supabase-js";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  signUp(credentials: SignInWithPasswordCredentials) {
    return this.supabase.auth.signUp(credentials);
  }
  signIn(credentials: SignInWithPasswordCredentials) {
    return this.supabase.auth.signInWithPassword(credentials);
  }

  signOut() {
    return this.supabase.auth.signOut();
  }
}
