import {Component, effect, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiToggleModule} from '@taiga-ui/kit';
import {AssistantStore} from '../store/assistant.store';

@Component({
    selector: 'polity-assistant-toggle',
    templateUrl: './assistant-toggle.component.html',
    styleUrls: ['./assistant-toggle.component.less'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiToggleModule
    ]
})
export class AssistantToggleComponent {
    // isAssistantLoading: WritableSignal<boolean> = signal(true);
    protected assistantStore: AssistantStore = inject(AssistantStore);
    protected toggleAssistantForm: FormGroup<{
        showAssistant: FormControl<boolean | null>
    }> = new FormGroup({
        showAssistant: new FormControl(false)
    });

    // private assistant: WritableSignal<SupabaseObjectReturn<'read_assistant'> | null> = signal(null);

    constructor(
        // private readonly assistantService: AssistantActionService,
        // private readonly assistantStoreService: AssistantStoreService
    ) {
        // this.assistant = this.assistantStoreService.assistant.getObject();
        // this.isAssistantLoading = this.assistantStoreService.assistant.loading.getLoading();
        // console.log('loading', this.isAssistantLoading());

        effect((): void => {
            this.toggleAssistantForm.patchValue({
                showAssistant: !this.assistantStore.data().skip_tutorial_
            });
        });
    }

    protected async toggleAssistant(): Promise<void> {
        const newValue: boolean = this.toggleAssistantForm.value.showAssistant as boolean;
        await this.assistantStore.skipTutorial(newValue);
        // await this.assistantService.skipTutorial(newValue)
        this.assistantStore.updateLastTutorial('profile');
        // await this.assistantService.updateLastTutorial('profile')
    }

}
