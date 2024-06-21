import {Component, inject, Inject} from '@angular/core';
import {
    TuiButtonModule,
    TuiDialogContext,
    TuiErrorModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {SupabaseObjectReturn} from '../../../../../supabase/types/supabase.authenticated.shorthand-types';
import {TuiCarouselModule, TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit';
import {CommonModule} from '@angular/common';
import {DatabaseHiddenOverwritten} from '../../../../../supabase/types/supabase.hidden.modified';
import {ProfileStore} from '../../profile/state/profile.store';
import {AssistantStore} from '../state/assistant.store';
import {SessionStore} from '../../../auth/state/session.store';
import {AssistantWelcomeDialogForm} from '@polity-assistant/assistant-welcom-dialog-form/assistant-welcome-dialog.form';

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
        TuiButtonModule,
        AssistantWelcomeDialogForm
    ],
    providers: [
        ProfileStore
    ]
})
export class AssistantWelcomeDialogComponent {
    protected assistantStore: AssistantStore = inject(AssistantStore);
    protected profileStore: ProfileStore = inject(ProfileStore);
    protected sessionStore: SessionStore = inject(SessionStore);
    protected name: string = '';
    protected index: number = 0;
    private readonly sessionId: string | null = null;


    constructor(
        @Inject(POLYMORPHEUS_CONTEXT) private readonly dialogContext: TuiDialogContext<boolean>,
        private router: Router
    ) {
        this.sessionId = this.sessionStore.getSessionId();

        if (this.assistantStore.data().last_tutorial_ === 'welcome') {
            this.index = 0;
        } else if (this.assistantStore.data().last_tutorial_ === 'profile') {
            this.index = 1;
        } else if (this.assistantStore.data().last_tutorial_ === 'search') {
            this.index = 2;
        }
    }

    protected async step1NavigateToProfileStep(data: {
        profile: SupabaseObjectReturn<'read_profile'>,
        step: number
    }): Promise<void> {
        await Promise.all([
            this.updateProfileName(data.profile),
            this.assistantStore.updateFirstSignIn(false),
            this.setLastTutorial('profile')
        ]);
        this.index = (this.index + data.step) % 3;
    }

    protected async step1CloseTutorial(profile: SupabaseObjectReturn<'read_profile'>): Promise<void> {
        await Promise.all([
            this.updateProfileName(profile),
            this.assistantStore.updateFirstSignIn(false),
            this.setLastTutorial('profile')
        ]);
        this.closeDialog();
    }

    protected async step2CloseAndSkipTutorial(): Promise<void> {
        await Promise.all([
            this.setLastTutorial('search'),
            this.assistantStore.skipTutorial(true)
        ]);
        this.closeDialog();
    }

    protected async step2NavigateToProfilePage(): Promise<void> {
        await Promise.all([
            await this.router.navigate(['/profile/' + this.sessionId + '/edit']),
            this.setLastTutorial('search')
        ]);
        this.closeDialog();
    }

    protected async step3NavigateToSearchPage(): Promise<void> {
        await this.router.navigate(['/search']);
        await Promise.all([
            this.assistantStore.updateLastTutorial('search'),
            this.assistantStore.skipTutorial(true)
        ]);
        this.closeDialog();
    }

    protected async step3CloseAndSkipTutorial(): Promise<void> {
        await Promise.all([
            this.setLastTutorial('search'),
            this.assistantStore.skipTutorial(true)
        ]);
        this.closeDialog();
    }

    private closeDialog(): void {
        this.dialogContext.completeWith(false);
    }

    private async setLastTutorial(newStatus: DatabaseHiddenOverwritten['hidden']['Enums']['tutorial_enum']): Promise<void> {
        await this.assistantStore.updateLastTutorial(newStatus);
    }

    private async updateProfileName(profile: SupabaseObjectReturn<'read_profile'>): Promise<void> {
        await Promise.all([
            this.profileStore.update(profile),
            this.assistantStore.updateLastTutorial('profile')
        ]);
    }
}
