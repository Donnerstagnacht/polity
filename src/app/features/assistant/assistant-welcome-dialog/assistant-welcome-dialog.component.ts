import {Component, Inject, signal, WritableSignal} from '@angular/core';
import {
    TuiButtonModule,
    TuiDialogContext,
    TuiErrorModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SessionStoreService} from "../../../auth/services/session.store.service";
import {Router} from "@angular/router";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {SupabaseArrayReturnConditional} from "../../../../../supabase/types/supabase.shorthand-types";
import {TuiCarouselModule, TuiFieldErrorPipeModule, TuiInputModule} from "@taiga-ui/kit";
import {CommonModule} from "@angular/common";
import {ProfileActionService} from "../../profile/action-store-services/profile.action.service";
import {AssistantActionService} from "../action-stores-services/assistant.action.service";
import {AssistantStoreService} from "../action-stores-services/assistant.store.service";

@Component({
    selector: 'polity-assistant-welcome-dialog',
    templateUrl: './assistant-welcome-dialog.component.html',
    styleUrls: ['./assistant-welcome-dialog.component.less'],
    standalone: true,
    imports: [
        TuiCarouselModule,
        ReactiveFormsModule,
        TuiSvgModule,
        TuiInputModule,
        TuiFieldErrorPipeModule,
        TuiTextfieldControllerModule,
        TuiErrorModule,
        CommonModule,
        TuiButtonModule
    ]
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
    private readonly sessionId: string | null = null;
    private assistant: WritableSignal<SupabaseArrayReturnConditional<'select_assistant'> | null> = signal(null);

    constructor(
        @Inject(POLYMORPHEUS_CONTEXT) private readonly dialogContext: TuiDialogContext<boolean>,
        private profilService: ProfileActionService,
        private sessionStoreService: SessionStoreService,
        private assistantService: AssistantActionService,
        private assistantStoreService: AssistantStoreService,
        private router: Router
    ) {
        this.sessionId = this.sessionStoreService.getSessionId();
        this.assistant = this.assistantStoreService.assistant.getObject()

        if (this.assistant()?.last_tutorial === 'welcome') {
            this.index = 0
        } else if (this.assistant()?.last_tutorial === 'profile') {
            this.index = 1
        } else if (this.assistant()?.last_tutorial === 'search') {
            this.index = 2
        }
    }

    protected async step1navigateToProfileStep(delta: number): Promise<void> {
        await Promise.all([
            this.updateProfileName(),
            this.assistantService.updateFirstSignIn(false),
            this.setLastTutorial('profile')
        ])
        this.index = (this.index + delta) % 3;
    }

    protected async step1closeTutorial(): Promise<void> {
        await Promise.all([
            this.updateProfileName(),
            this.assistantService.updateFirstSignIn(false),
            this.setLastTutorial('profile')
        ])
        this.closeDialog()
    }

    protected async step2closeAndSkipTutorial(): Promise<void> {
        await Promise.all([
            this.setLastTutorial('search'),
            this.assistantService.skipTutorial(true)
        ])
        this.closeDialog()
    }

    protected async step2navigateToProfilePage(): Promise<void> {
        await Promise.all([
            await this.router.navigate(['/profile/' + this.sessionId + '/edit']),
            this.setLastTutorial('search')
        ])
        this.closeDialog();
    }

    protected async step3navigateToSearchPage(): Promise<void> {
        await this.router.navigate(['/search']);
        await Promise.all([
            this.assistantService.updateLastTutorial('search'),
            this.assistantService.skipTutorial(true)
        ])
        this.closeDialog();
    }

    protected async step3closeAndSkipTutorial(): Promise<void> {
        await Promise.all([
            this.setLastTutorial('search'),
            this.assistantService.skipTutorial(true)
        ])
        this.closeDialog()
    }

    private closeDialog(): void {
        this.dialogContext.completeWith(false);
    }

    private async setLastTutorial(newStatus: DatabaseOverwritten["public"]["Enums"]["tutorial_enum"]): Promise<void> {
        await this.assistantService.updateLastTutorial(newStatus)
    }

    private async updateProfileName(): Promise<void> {
        this.name = this.welcomeForm.value.firstName + ' ' + this.welcomeForm.value.lastName;
        const profile: SupabaseArrayReturnConditional<'select_user'> = {
            first_name: this.welcomeForm.value.firstName as string,
            last_name: this.welcomeForm.value.lastName as string
        } as SupabaseArrayReturnConditional<'select_user'>
        await Promise.all([
            this.profilService.updateProfile(profile),
            this.assistantService.updateLastTutorial('profile')
        ])
    }
}
