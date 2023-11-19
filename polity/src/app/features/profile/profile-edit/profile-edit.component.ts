import {ChangeDetectionStrategy, Component, effect, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";
import {Profile} from "../types-and-interfaces/profile";
import {ProfileService} from "../services/profile.service";
import {ProfileStoreService} from "../services/profile-store.service";
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

    constructor(
        private readonly userService: ProfileService,
        private readonly userStoreService: ProfileStoreService,
        private readonly globalUiStateService: UiStoreService
    ) {
        this.globalUiStateService.setLoading(true);
        this.profile = this.userStoreService.profile.selectEntity()

        // this.profile = this.userStoreService.selectProfile();

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
                id: '',
                first_name: this.editProfileForm.value.firstName as string,
                last_name: this.editProfileForm.value.lastName as string
            }
        await this.userService.updateProfile(profile);
        this.globalUiStateService.setLoading(false);
    }
}
