import {Component, inject, Inject, Injector} from '@angular/core';
import {TuiDialogService} from '@taiga-ui/core';
import {AssistantWelcomeDialogComponent} from '../assistant-welcome-dialog/assistant-welcome-dialog.component';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {AssistantIconComponent} from '../assistant-icon/assistant-icon.component';
import {CommonModule} from '@angular/common';
import {AssistantStore} from '../state/assistant.store';

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
    protected readonly assistantStore: AssistantStore = inject(AssistantStore);

    constructor(
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector
    ) {
    }

    async ngOnInit(): Promise<void> {
        await this.assistantStore.read();

        // TODO: needs to be activated in production
        // is deactivated since conditional testing makes Cypress tests flaky
        // and would affect all test since this affects the reused login tests
        // this.showDialog()
        // }
    }

    private showDialog(): void {
        this.dialogs
            .open(
                new PolymorpheusComponent(AssistantWelcomeDialogComponent, this.injector),
                {
                    size: 'page',
                    closeable: true,
                    dismissible: true
                }
            )
            .subscribe();
    }
}
