import {Component, effect, Inject, Injector, signal, WritableSignal} from '@angular/core';
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {AssistantWelcomeDialogComponent} from "../assistant-welcome-dialog/assistant-welcome-dialog.component";
import {TuiButtonModule, TuiDialogService} from "@taiga-ui/core";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {TuiActionModule, TuiMarkerIconModule} from "@taiga-ui/kit";
import {CommonModule} from "@angular/common";
import {Tutorial, TUTORIALS} from "../constants-stypes-interfaces/tutorial";
import {AssistantStoreService} from "../action-stores-services/assistant.store.service";


@Component({
    selector: 'polity-assistant-icon',
    templateUrl: './assistant-icon.component.html',
    styleUrls: ['./assistant-icon.component.less'],
    standalone: true,
    imports: [
        TuiMarkerIconModule,
        TuiButtonModule,
        CommonModule,
        TuiActionModule
    ]
})
export class AssistantIconComponent {
    protected isAssistantLoading: WritableSignal<boolean> = signal(true)
    private assistant: WritableSignal<SupabaseObjectReturn<'read_assistant'> | null> = signal(null)
    private tutorials: Tutorial[] = TUTORIALS
    protected activatedTutorial: Tutorial = this.tutorials[0]

    constructor(
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
        private readonly assistantStoreService: AssistantStoreService
    ) {
        this.isAssistantLoading = this.assistantStoreService.assistant.loading.getLoading();
        this.assistant = this.assistantStoreService.assistant.getObject()

        effect((): void => {
            if (this.assistant()?.last_tutorial_ === 'welcome') {
                this.activatedTutorial = this.tutorials[0]
            } else if (this.assistant()?.last_tutorial_ === 'profile') {
                this.activatedTutorial = this.tutorials[1]
            } else if (this.assistant()?.last_tutorial_ === 'search') {
                this.activatedTutorial = this.tutorials[2]
            }
        })
    }

    protected showDialog(): void {
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
