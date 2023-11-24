import {ChangeDetectionStrategy, Component, Inject, signal, WritableSignal} from '@angular/core';
import {TuiDialogContext} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../profile/services/profile.service";
import {Profile} from "../../profile/types-and-interfaces/profile";
import {SessionStoreService} from "../../../core/services/session-store.service";
import {Router} from "@angular/router";
import {AssistantService} from "../services/assistant.service";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";
import {AssistantStoreService} from "../services/assistant-store.service";

@Component({
    selector: 'polity-assistant-welcome-dialog',
    templateUrl: './assistant-welcome-dialog.component.html',
    styleUrls: ['./assistant-welcome-dialog.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssistantWelcomeDialogComponent {
    protected welcomeForm: FormGroup<{
        firstName: FormControl<string | null>,
        lastName: FormControl<string | null>,
    }> = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required)
    })
    protected name: string = '';
    protected index: number = 0;
    private sessionId: string | null = null;
    private assistant: WritableSignal<Tables<'assistants'> | null> = signal(null);

    constructor(
        @Inject(POLYMORPHEUS_CONTEXT) private readonly dialogContext: TuiDialogContext<boolean>,
        private profilService: ProfileService,
        private sessionStoreService: SessionStoreService,
        private assistantService: AssistantService,
        private assistantStoreService: AssistantStoreService,
        private router: Router
    ) {
        this.sessionId = this.sessionStoreService.getSessionId();
        this.assistant = this.assistantStoreService.assistant.getEntity()

        if (this.assistant()?.last_tutorial === 'welcome') {
            this.index = 0
        } else if (this.assistant()?.last_tutorial === 'profile') {
            this.index = 1
        } else if (this.assistant()?.last_tutorial === 'search') {
            this.index = 2
        }
    }

    protected step1navigateToProfileStep(delta: number): void {
        this.updateProfileName();
        this.assistantService.updateFirstSignIn(false)
        this.setLastTutorial('profile')
        this.index = (this.index + delta) % 3;
    }

    protected step1closeTutorial(): void {
        this.updateProfileName();
        this.assistantService.updateFirstSignIn(false)
        this.setLastTutorial('profile')
        this.closeDialog()
    }

    protected step2closeAndSkipTutorial(): void {
        this.setLastTutorial('search')
        this.assistantService.skipTutorial(true)
        this.closeDialog()
    }

    protected step2navigateToProfilePage(): void {
        this.router.navigate(['/profile/' + this.sessionId + '/edit']);
        this.setLastTutorial('search')
        this.closeDialog();
    }

    protected step3navigateToSearchPage(): void {
        this.router.navigate(['/search']);
        this.assistantService.updateLastTutorial('search')
        this.assistantService.skipTutorial(true)
        this.closeDialog();
    }

    protected step3closeAndSkipTutorial(): void {
        this.setLastTutorial('search')
        this.assistantService.skipTutorial(true)
        this.closeDialog()
    }

    private closeDialog(): void {
        this.dialogContext.completeWith(false);
    }

    private setLastTutorial(newStatus: DatabaseOverwritten["public"]["Enums"]["tutorial_enum"]): void {
        this.assistantService.updateLastTutorial(newStatus)
    }

    private updateProfileName(): void {
        this.name = this.welcomeForm.value.firstName + ' ' + this.welcomeForm.value.lastName;
        const profile: Profile = {
            id: '',
            first_name: this.welcomeForm.value.firstName as string,
            last_name: this.welcomeForm.value.lastName as string
        }
        this.profilService.updateProfile(profile)
        this.assistantService.updateLastTutorial('profile')
    }
}
