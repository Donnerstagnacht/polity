import {Component} from '@angular/core';
import {Profile} from "../types-and-interfaces/profile";
import {AuthSession} from "@supabase/supabase-js";
import {SessionStoreService} from "../../core/services/session-store.service";
import {profileService} from "../services/profile.service";
import {profileStoreService} from "../services/profile-store.service";

@Component({
  selector: 'polity-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent {
  session: AuthSession | null = null;
  loading: boolean = false;
  profile: Profile | null = null;
  constructor(
      private readonly sessionStoreService: SessionStoreService,
      private readonly userStoreService: profileStoreService,
      private readonly userService: profileService
      ) {
    this.sessionStoreService.selectSessionSlice().subscribe((session) => {
      this.session = session;
      this.getprofile();
    })
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
        this.userStoreService.updateProfile(profile);
        this.userStoreService.profile$.subscribe((profile) => {
          this.profile = profile
        })
      } else {
        // this.profile!.firstName = undefined;
      }
    } catch (error) {
      if (error instanceof Error) {
        // this.profile!.firstName = undefined;
      }
    } finally {
      this.loading = false
    }
  }
}
