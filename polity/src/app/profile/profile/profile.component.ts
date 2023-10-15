import {Component, Input} from '@angular/core';
import {Profile} from "../profile";
import {AuthentificationService, Profile as ProfileSub} from "../../core/authentification.service";
import {AuthSession} from "@supabase/supabase-js";
import {SessionStoreService, sessionStore} from "../../core/session-store.service";

@Component({
  selector: 'polity-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent {
  // @Input() session!: AuthSession
  session: AuthSession | null = null
  loading: boolean = false;
  profile: Profile = {
    id: 'sefddf',
    firstName: 'Tobias',
    lastName: 'Hassebrock',
    profileImage: 'udsfdfdff'
  }

  profileSub!: ProfileSub
  sessionStore = sessionStore

  constructor(
      private readonly authService: AuthentificationService,
      private readonly sessionStoreService: SessionStoreService,
      ) {
    // this.sessionStore.subscribe((state) => {
    //   console.log('state from session store')
    //   console.log(state)
    //   this.session = state.session;
    // })
    this.sessionStoreService.selectSession().subscribe((session) => {
      this.session = session.session
    })
  }

  async ngOnInit() {
    await this.getprofile();
    console.log(this.profileSub)
  }
  async editProfile(newProfileData: Profile) {
    console.log(newProfileData);
    try {
      this.loading = true;
      if(this.session) {
        const { error } = await this.authService.updateProfile({
          id: this.session.user.id,
          username: newProfileData.firstName,
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
    try {
      this.loading = true;
      if (this.session) {
        const {user} = this.session;
        let {data: profile, error, status} = await this.authService.profile(user)
        if (error && status !== 406) {
          throw error
        }
        if (profile) {
          this.profileSub = profile
        }
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
