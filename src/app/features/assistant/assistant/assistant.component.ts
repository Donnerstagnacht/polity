import {Component, Inject, Injector, signal, WritableSignal} from '@angular/core';
import {TuiDialogService} from "@taiga-ui/core";
import {AssistantWelcomeDialogComponent} from "../assistant-welcome-dialog/assistant-welcome-dialog.component";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {SessionStoreService} from "../../../auth/services/session.store.service";
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";
import {AssistantIconComponent} from "../assistant-icon/assistant-icon.component";
import {CommonModule} from "@angular/common";
import {AssistantActionService} from "../action-stores-services/assistant.action.service";
import {AssistantStoreService} from "../action-stores-services/assistant.store.service";

@Component({
    selector: 'polity-assistant',
    templateUrl: './assistant.component.html',
    styleUrls: ['./assistant.component.less'],
    standalone: true,
    imports: [
        AssistantIconComponent,
        CommonModule
    ]
})
export class AssistantComponent {
    protected assistant: WritableSignal<Tables<'assistants'> | null> = signal({
        skip_tutorial: true,
    }) as WritableSignal<Tables<'assistants'> | null>;

    constructor(
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
        private readonly assistantService: AssistantActionService,
        private readonly sessionStoreService: SessionStoreService,
        private readonly assistantStoreService: AssistantStoreService
    ) {
    }

    async ngOnInit(): Promise<void> {
        const sessionId: string | null = this.sessionStoreService.getSessionId();
        await this.assistantService.selectAssistant(sessionId as string);
        this.assistant = this.assistantStoreService.assistant.getObject()
        console.log('assistant', this.assistant());

        if (this.assistant()?.first_sign_in) {
            // TODO: needs to be activated in production
            // is deactivated since conditional testing makes Cypress tests flaky
            // and would affect all test since this affects the reused login tests
            // this.showDialog()
        }
    }

    private showDialog(): void {
        this.dialogs
        .open(
            new PolymorpheusComponent(AssistantWelcomeDialogComponent, this.injector),
            {
                size: 'page',
                closeable: true,
                dismissible: true,
            },
        )
        .subscribe();
    }
}
