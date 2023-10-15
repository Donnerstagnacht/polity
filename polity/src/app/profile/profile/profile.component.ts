import {Component, Input} from '@angular/core';
import {Profile} from "../profile";
import {AuthentificationService, Profile as ProfileSub} from "../../core/authentification.service";
import {AuthSession} from "@supabase/supabase-js";

@Component({
  selector: 'polity-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent {
  @Input() session!: AuthSession
  loading: boolean = false;
  profile: Profile = {
    id: 'sefddf',
    firstName: 'Tobias',
    lastName: 'Hassebrock',
    profileImage: 'udsfdfdff'
  }

  profileSub!: ProfileSub

  constructor(private readonly authService: AuthentificationService) { }

  async ngOnInit() {
    await this.getprofile();
    console.log(this.profileSub)
  }
  async editProfile(newProfileData: Profile) {
    console.log(newProfileData);
    try {
      this.loading = true;

      const { error } = await this.authService.updateProfile({
        id: this.session.user.id,
        username: 'username',
        website: 'website',
        avatar_url: 'avatar_url',
      })
      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }

  async getprofile() {
    try {
      this.loading = true;
      const {user} = this.session;
      let {data: profile, error, status} = await this.authService.profile(user)
      if (error && status !== 406) {
        throw error
      }
      if (profile) {
        this.profileSub = profile
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
      console.log('finally', this.profileSub)
    }
  }

}
