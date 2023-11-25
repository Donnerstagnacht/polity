import {Component, effect, Inject, Injector, signal, WritableSignal} from '@angular/core';
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {AssistantWelcomeDialogComponent} from "../assistant-welcome-dialog/assistant-welcome-dialog.component";
import {TuiDialogService} from "@taiga-ui/core";
import {AssistantStoreService} from "../services/assistant-store.service";
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";
import {Tutorial} from "../types-and-interfaces/tutorial";


@Component({
    selector: 'polity-assisstant-icon',
    templateUrl: './assisstant-icon.component.html',
    styleUrls: ['./assisstant-icon.component.less']
})
export class AssisstantIconComponent {
    protected isAssistantLoading: WritableSignal<boolean> = signal(true)
    private assistant: WritableSignal<Tables<'assistants'> | null> = signal(null)
    private tutorials: Tutorial[] = [
        {
            title: 'Willkommen',
            description: 'Wir stellen uns vor.',
            dataCy: 'assistant-welcome-dialog',
        },
        {
            title: 'Dein Profil',
            description: 'Zeige der Welt wofür du stehst.',
            dataCy: 'assistant-profile-dialog',
        },
        {
            title: 'Unsere Suche',
            description: 'Finde Like Minded Menschen.',
            dataCy: 'assistant-search-dialog',
        },
        {
            title: 'Follow ',
            description: 'Follow deinen Lieblingspersonen.',
            dataCy: 'assistant-follow-dialog',
        }
    ]
    protected activatedTutorial: Tutorial = this.tutorials[0]

    constructor(
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
        private readonly assistantStoreService: AssistantStoreService
    ) {
        this.isAssistantLoading = this.assistantStoreService.assistant.loading.getLoading();
        this.assistant = this.assistantStoreService.assistant.getObject()

        effect((): void => {
            if (this.assistant()?.last_tutorial === 'welcome') {
                this.activatedTutorial = this.tutorials[0]
            } else if (this.assistant()?.last_tutorial === 'profile') {
                this.activatedTutorial = this.tutorials[1]
            } else if (this.assistant()?.last_tutorial === 'search') {
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
