import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {
  private supabaseClient: SupabaseClient;

  constructor(private authentificationService: AuthentificationService) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

  async isAlreadyFollower(following: string): Promise<{data: any, error: any}> {
    const loggedInID = this.authentificationService.user?.id;
    const results: {data: any, error: any} = await this.supabaseClient
      .from('following_profile_system')
      .select(
        `id,
        follower,
        following`
      )
      .eq('follower', loggedInID)
      .eq('following', following)
    return results;

  }

  async getAllFollower(): Promise<{data: any, error: any}> {
    const loggedInID = this.authentificationService.user?.id;
    const followers: {data: any, error: any} = await this.supabaseClient
    .from('following_profile_system')
    .select(
      `id,
      follower,
      profiles!following_profile_system_follower_fkey (
        id,
        name,
        avatar_url
      )`
    )
    .eq('following', loggedInID)
  return followers;
  }

  async getAllFollowing(): Promise<{data: any, error: any}> {
    const loggedInID = this.authentificationService.user?.id;
    const followings: {data: any, error: any} = await this.supabaseClient
    .from('following_profile_system')
    .select(
      `id,
      following,
      profiles!following_profile_system_following_fkey (
        id,
        name,
        avatar_url
      )`
    )
    .eq('follower', loggedInID)
  return followings;
  }

  async followTransaction(follower: string): Promise<{data: any, error: any}> {
    const loggedInID = this.authentificationService.user?.id;
    const followTransactionResult: { data: any, error: any } = await this.supabaseClient
      .rpc('followtransaction', {followingid: follower, followerid: loggedInID})
    return followTransactionResult;
  }

  async unfollowTransaction(follower: string): Promise<{data: any, error: any}> {
    const loggedInID = this.authentificationService.user?.id;
    const unfollowTransactionResult: { data: any, error: any } = await this.supabaseClient
      .rpc('unfollowtransaction', {followingid: follower, followerid: loggedInID})
    return unfollowTransactionResult;
  }

  async removeFollowerTransaction(follower: string): Promise<{data: any, error: any}> {
    const loggedInID = this.authentificationService.user?.id;
    const unfollowTransactionResult: { data: any, error: any } = await this.supabaseClient
      .rpc('unfollowtransaction', {followingid: loggedInID, followerid: follower})
    return unfollowTransactionResult;
  }
}
