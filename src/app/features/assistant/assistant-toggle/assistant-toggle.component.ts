import {Component, effect, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiToggleModule} from '@taiga-ui/kit';
import {AssistantStore} from '../state/assistant.store';

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
    protected assistantStore: AssistantStore = inject(AssistantStore);
    protected toggleAssistantForm: FormGroup<{
        showAssistant: FormControl<boolean | null>
    }> = new FormGroup({
        showAssistant: new FormControl(false)
    });

    constructor() {
        effect((): void => {
            this.toggleAssistantForm.patchValue({
                showAssistant: !this.assistantStore.data().skip_tutorial_
            });
        });
    }

    protected async toggleAssistant(): Promise<void> {
        const newValue: boolean = this.toggleAssistantForm.value.showAssistant as boolean;
        await this.assistantStore.skipTutorial(newValue);
        await this.assistantStore.updateLastTutorial('profile');
    }

}
