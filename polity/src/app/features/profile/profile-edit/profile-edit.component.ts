import {ChangeDetectionStrategy, Component, effect, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";
import {Profile} from "../types-and-interfaces/profile";
import {PostgrestSingleResponse, Session} from "@supabase/supabase-js";
import {SessionStoreService} from "../../../core/services/session-store.service";
import {ProfileService} from "../services/profile.service";
import {ProfileStoreService} from "../services/profile-store.service";
import {NotificationsStoreService} from "../../../core/services/notifications-store.service";
import {UiStoreService} from "../../../core/services/ui-store.service";

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
    protected profile: WritableSignal<Profile | null> = signal(null);
    protected editProfileForm: FormGroup<{
        firstName: FormControl<string | null>,
        lastName: FormControl<string | null>
    }> = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required)
    })
    private auth: WritableSignal<Session | null> = signal(null)

    constructor(
        private readonly sessionStoreService: SessionStoreService,
        private readonly userService: ProfileService,
        private readonly userStoreService: ProfileStoreService,
        private readonly notificationService: NotificationsStoreService,
        private readonly globalUiStateService: UiStoreService
    ) {
        this.globalUiStateService.setLoading(true);
        this.profile = this.userStoreService.selectProfile();
        this.auth = this.sessionStoreService.selectSession();
        this.globalUiStateService.setLoading(false);

        effect(() => {
            this.editProfileForm.patchValue({
                firstName: this.profile()?.first_name as string,
                lastName: this.profile()?.last_name as string
            })
        });
    }


    protected async onEdit(): Promise<void> {
        this.globalUiStateService.setLoading(true);
        const profile: Profile =
            {
                id: this.auth()?.user.id!,
                first_name: this.editProfileForm.value.firstName as string,
                last_name: this.editProfileForm.value.lastName as string
            }
        await this.editProfile(profile);
        this.globalUiStateService.setLoading(false);
    }

    private async editProfile(newProfileData: Profile): Promise<void> {
        try {
            if (this.auth()) {
                const databaseResponse: PostgrestSingleResponse<null> = await this.userService.updateProfile({
                    id: this.auth()?.user.id as string,
                    first_name: newProfileData.first_name as string,
                    last_name: newProfileData.last_name as string,
                    username: newProfileData.first_name as string
                });
                if (databaseResponse.error) throw databaseResponse.error
                this.userStoreService.setProfile(newProfileData);
            } else {
                throw new Error('no session')
            }
        } catch (error) {
            if (error instanceof Error) {
                this.notificationService.updateNotification(error.message, true);
            }
        }
    }
}
