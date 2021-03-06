import { Injectable } from '@angular/core';
import { AuthChangeEvent, createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { account } from '../../../types/account';

export interface Profile {
  amendment_counter: number;
  follower_counter: number;
  following_counter: number;
  groups_counter: number;
  id: string;
  name: string;
  website: string;
  avatar_url: string;
  contact_email: string;
  contact_phone: string;
  street: string;
  post_code: string;
  city: string;
  about: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private supabase: SupabaseClient;
  public publicUser = new BehaviorSubject<User | null>(null);
  private loggedInStatus = new BehaviorSubject<boolean>(false);

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

   public getLoggedInStatus(): Observable<boolean> {
    return this.loggedInStatus;
   }

  public createAccount(account: account): Promise<any> {
    return this.signUp(account.email, account.password);
  }

  get user(): User | null {
    return this.supabase.auth.user();
  }

  public isUserLoggedIn(): boolean {
    let user: User | null;
    user = this.user;
    if (this.user) {
     return true;
    } else {
      return false;
    }
  }

  get session() {
    return this.supabase.auth.session();
  }

  get profile() {
    return this.supabase
      .from('profiles')
      .select(
        `id,
        name,
        website,
        avatar_url,
        contact_email,
        contact_phone,
        street,
        post_code,
        city,
        about`)
      .eq('id', this.user?.id)
      .single();
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  authCheckLogin(): void {
    this.supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null): void => {
      if(session?.user) {
        this.loggedInStatus.next(true);
      } else {
        this.loggedInStatus.next(false);
      }
    })
  }

  async signUp(email: string, password: string): Promise<any> {
    const response = await this.supabase.auth.signUp({ email, password });
    if (response.error) throw new Error(response.error.message);
  }

  async signIn(email: string, password: string) {
    const response = await this.supabase.auth.signIn({ email, password });
    this.loggedInStatus.next(true);
    console.log(this.loggedInStatus)
    console.log(this.loggedInStatus)
    if (response.error) throw new Error(response.error.message);
  }

  async signOut() {
    const response = await this.supabase.auth.signOut();
    this.loggedInStatus.next(false);
    if (response.error) {
      throw new Error(response.error.message)
    }
  }

  updateProfile(profile: Partial<Profile>) {
    const update = {
      ...profile,
      id: this.user?.id,
      updated_at: new Date()
    }

    return this.supabase.from('profiles').upsert(update, {
      returning: 'minimal', // Don't return the value after inserting
    });
  }

}
function callback(callback: any, arg1: (event: AuthChangeEvent, session: Session | null) => undefined) {
  throw new Error('Function not implemented.');
}

