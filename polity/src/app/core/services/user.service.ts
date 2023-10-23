import { Injectable } from '@angular/core';
import {createClient, SupabaseClient, User} from "@supabase/supabase-js";
import {environment} from "../../../environments/environment";
import {Profile} from "../types-and-interfaces/profile";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  selectProfile(user: User) {
    return this.supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    }

    return this.supabase.from('profiles').upsert(update)
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file)
  }

}
