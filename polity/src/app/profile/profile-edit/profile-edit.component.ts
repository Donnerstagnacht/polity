import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";
import {Profile} from "../profile";

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
  editProfileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  })
  @Input() profile!: Profile;
  @Output() newProfileEditEvent = new EventEmitter<Profile>();

  onSubmit() {
    // console.log(this.editProfileForm.value);
    this.newProfileEditEvent.emit(
      {
          id: this.profile.id,
          firstName: this.editProfileForm.value.firstName as string,
          lastName: this.editProfileForm.value.lastName as string,
          profileImage: this.profile.profileImage
      }
    )
  }

}
