import {Component, effect, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TUI_VALIDATION_ERRORS, TuiFieldErrorPipeModule, TuiInputModule} from "@taiga-ui/kit";
import {TuiButtonModule, TuiErrorModule, TuiSvgModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {AssistantToggleComponent} from "../../assistant/assistant-toggle/assistant-toggle.component";
import {SignOutComponent} from "../../../auth/sign-out/sign-out.component";
import {CommonModule} from "@angular/common";
import {ProfileImageUploadComponent} from "../profile-image-upload/profile-image-upload.component";
import {ProfileStoreService} from "../action-store-services/profile.store.service";
import {ProfileActionService} from "../action-store-services/profile.action.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {
    NotficationsFromFollowToggleComponent
} from "../../notifications/notfications-from-follow-toggle/notfications-from-follow-toggle.component";
import {UpdateEmailComponent} from "../../../auth/update-email/update-email.component";
import {UpdatePasswordComponent} from "../../../auth/update-password/update-password.component";

@Component({
    selector: 'polity-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.less'],
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
                required: 'Bitte ausfüllen',
            }
        }
    ]
})
export class ProfileEditComponent {
    protected profile: WritableSignal<SupabaseObjectReturn<'read_profile'> | null> = signal(null);
    protected editProfileForm: FormGroup<{
        firstName: FormControl<string | null>,
        lastName: FormControl<string | null>
    }> = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required)
    })
    protected isProfileLoading: WritableSignal<boolean> = signal(true);

    constructor(
        private readonly profileService: ProfileActionService,
        private readonly profileStoreService: ProfileStoreService,
    ) {
        this.isProfileLoading = this.profileStoreService.profile.loading.getLoading()
        this.profile = this.profileStoreService.profile.getObject()

        effect((): void => {
            this.editProfileForm.patchValue({
                firstName: this.profile()?.first_name_ as string,
                lastName: this.profile()?.last_name_ as string
            })
        });
    }


    protected async onEdit(): Promise<void> {
        const profile: SupabaseObjectReturn<'read_profile'> =
            {
                first_name_: this.editProfileForm.value.firstName,
                last_name_: this.editProfileForm.value.lastName
            } as SupabaseObjectReturn<'read_profile'>
        await this.profileService.updateProfile(profile);
    }
}
