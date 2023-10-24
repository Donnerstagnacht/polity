import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";
import {Profile} from "../types-and-interfaces/profile";
import {AuthSession} from "@supabase/supabase-js";
import {SessionStoreService} from "../../core/services/session-store.service";
import {profileService} from "../services/profile.service";
import {profileStoreService} from "../services/profile-store.service";

@Component({
  selector: 'polity-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
          required: 'Bitte ausfüllen',
      }
    }

  ]
})
export class ProfileEditComponent {
  session: AuthSession | null = null;
  loading: boolean = false;

  editProfileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  })

  constructor(
      private readonly sessionStoreService: SessionStoreService,
      private readonly userService: profileService,
      private readonly userStoreService: profileStoreService
  ) {
    this.sessionStoreService.selectSessionSlice().subscribe((session) => {
      this.session = session;
    })
  }

  onSubmit() {
    const profile: Profile =
      {
          id: 'sdfdfdf',
          first_name: this.editProfileForm.value.firstName as string,
          last_name: this.editProfileForm.value.lastName as string,
          profileImage: 'sdfdsfddf'
      }
      this.editProfile(profile);
  }

  async editProfile(newProfileData: Profile) {
    console.log(newProfileData);
    try {
      this.loading = true;
      if(this.session) {
        const { error } = await this.userService.updateProfile({
          id: this.session.user.id,
          first_name: newProfileData.first_name!,
          last_name: newProfileData.last_name!,
          username: newProfileData.first_name!,
          website: 'website',
          avatar_url: 'avatar_url',
        });
        if (error) throw error
        this.userStoreService.updateProfile(newProfileData);
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

}
