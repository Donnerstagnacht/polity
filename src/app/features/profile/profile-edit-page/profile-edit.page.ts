import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TUI_VALIDATION_ERRORS, TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit';
import {TuiButtonModule, TuiErrorModule, TuiSvgModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {AssistantToggleComponent} from '../../assistant/assistant-toggle/assistant-toggle.component';
import {SignOutComponent} from '../../../auth/auth-ui/sign-out/sign-out.component';
import {CommonModule} from '@angular/common';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {
    NotficationsFromFollowToggleComponent
} from '@polity-office/notification-ui/notfications-from-follow-toggle/notfications-from-follow-toggle.component';
import {UpdateEmailComponent} from '../../../auth/auth-ui/update-email/update-email.component';
import {ProfileStore} from '../state/profile.store';
import {UpdatePasswordComponent} from '../../../auth/auth-ui/update-password/update-password.component';
import {ProfileEditForm} from '@polity-profile/profile-ui/profile-edit/profile-edit.form';
import {ImageUploadComponent} from '@polity-ui/polity-image/image-upload/image-upload.component';

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
        ImageUploadComponent,
        TuiButtonModule,
        NotficationsFromFollowToggleComponent,
        UpdateEmailComponent,
        UpdatePasswordComponent,
        ProfileEditForm
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

    protected async onEdit(newProfileData: SupabaseObjectReturn<'read_profile'>): Promise<void> {
        await this.profileStore.update(newProfileData);
    }

    protected async onUpdateProfileImage(imgStoragePath: string): Promise<void> {
        await this.profileStore.update({profile_image_: imgStoragePath});

    }
}
