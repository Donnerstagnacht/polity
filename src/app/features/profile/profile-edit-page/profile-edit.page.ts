import {Component, effect, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TUI_VALIDATION_ERRORS, TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit';
import {TuiButtonModule, TuiErrorModule, TuiSvgModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {AssistantToggleComponent} from '../../assistant/assistant-toggle/assistant-toggle.component';
import {SignOutComponent} from '../../../auth/auth-ui/sign-out/sign-out.component';
import {CommonModule} from '@angular/common';
import {
    ProfileImageUploadComponent
} from '@polity-profile/profile-ui/profile-image-upload/profile-image-upload.component';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {
    NotficationsFromFollowToggleComponent
} from '@polity-office/notification-ui/notfications-from-follow-toggle/notfications-from-follow-toggle.component';
import {UpdateEmailComponent} from '../../../auth/auth-ui/update-email/update-email.component';
import {ProfileStore} from '../state/profile.store';
import {UpdatePasswordComponent} from '../../../auth/auth-ui/update-password/update-password.component';

@Component({
    selector: 'polity-profile-edit',
    templateUrl: './profile-edit.page.html',
    styleUrls: ['./profile-edit.page.less'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiInputModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiTextfieldControllerModule,
        AssistantToggleComponent,
        SignOutComponent,
        CommonModule,
        TuiSvgModule,
        ProfileImageUploadComponent,
        TuiButtonModule,
        NotficationsFromFollowToggleComponent,
        UpdateEmailComponent,
        UpdatePasswordComponent
    ],
    providers: [
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: 'Bitte ausfüllen'
            }
        }
    ]
})
export class ProfileEditPage {
    protected profileStore: ProfileStore = inject(ProfileStore);
    protected editProfileForm: FormGroup<{
        firstName: FormControl<string | null>,
        lastName: FormControl<string | null>
    }> = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required)
    });

    constructor() {
        effect((): void => {
            this.editProfileForm.patchValue({
                firstName: this.profileStore.data().first_name_,
                lastName: this.profileStore.data().last_name_
            });
        });
    }


    protected async onEdit(): Promise<void> {
        const profile: SupabaseObjectReturn<'read_profile'> =
            {
                first_name_: this.editProfileForm.value.firstName,
                last_name_: this.editProfileForm.value.lastName
            } as SupabaseObjectReturn<'read_profile'>;
        await this.profileStore.update(profile);
    }
}
