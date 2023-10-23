import {Component} from '@angular/core';
import {Profile} from "../profile";
import {AuthentificationService} from "../../core/services/authentification.service";
import {AuthSession} from "@supabase/supabase-js";
import {SessionStoreService, SessionProperties} from "../../core/services/session-store.service";
import {Store} from "@ngneat/elf";
import {Profile as ProfileSub} from "../../core/types-and-interfaces/profile";
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'polity-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent {
  session: AuthSession | null = null;
  loading: boolean = false;
  profile: Profile | null = {
    id: 'sefddf',
    firstName: 'Tobias',
    lastName: 'Hassebrock',
    profileImage: 'udsfdfdff'
  };

  profileSub!: ProfileSub | null;

  constructor(
      private readonly sessionStoreService: SessionStoreService,
      private readonly userService: UserService
      ) {
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
        const { error } = await this.userService.updateProfile({
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
            await this.userService.selectProfile(user)
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
