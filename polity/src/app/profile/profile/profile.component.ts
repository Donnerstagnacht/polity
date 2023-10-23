import {Component} from '@angular/core';
import {Profile} from "../profile";
import {AuthentificationService, Profile as ProfileSub} from "../../core/authentification.service";
import {AuthSession} from "@supabase/supabase-js";
import {SessionStoreService, SessionProperties} from "../../core/session-store.service";
import {Store} from "@ngneat/elf";

@Component({
  selector: 'polity-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent {
  // @Input() session!: AuthSession
  session: AuthSession | null = null;
  loading: boolean = false;
  profile: Profile | null = {
    id: 'sefddf',
    firstName: 'Tobias',
    lastName: 'Hassebrock',
    profileImage: 'udsfdfdff'
  };

  profileSub!: ProfileSub | null;
  sessionStore: Store<{ name: string, state: SessionProperties, config: undefined }>  | null = null;

  constructor(
      private readonly authService: AuthentificationService,
      private readonly sessionStoreService: SessionStoreService,
      ) {
    this.sessionStore = this.sessionStoreService.sessionStore
    this.sessionStoreService.selectSessionSlice().subscribe((session) => {
      this.session = session;
      this.getprofile();
    })
  }

  async editProfile(newProfileData: Profile) {
    console.log(newProfileData);
    try {
      this.loading = true;
      if(this.session) {
        const { error } = await this.authService.updateProfile({
          id: this.session.user.id,
          username: newProfileData.firstName!,
          website: 'website',
          avatar_url: 'avatar_url',
        })
        if (error) throw error
      } else {
        throw new Error('no session')
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }

  async getprofile() {
    console.log('called')
    try {
      this.loading = true;
      if (this.session ) {
        const user = this.session.user;
        let {data: profile, error, status} =
            await this.authService.profile(user)
        if (error && status !== 406) {
          throw error
        }
        this.profileSub = profile
        this.profile!.firstName = profile?.username;

      } else {
        this.profileSub = null;
        this.profile!.firstName = null;
        console.log('profile after change', this.profileSub, this.profile)
      }
    } catch (error) {
      if (error instanceof Error) {
        this.profileSub = null;
        this.profile!.firstName = null;
      }
    } finally {
      this.loading = false
      console.log('finally', this.profileSub)
    }
  }

}
