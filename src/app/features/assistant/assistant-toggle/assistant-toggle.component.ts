import {Component, effect, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AssistantActionService} from "../services/assistant.action.service";
import {AssistantStoreService} from "../services/assistant.store.service";
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";
import {TuiToggleModule} from "@taiga-ui/kit";

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
    isAssistantLoading: WritableSignal<boolean> = signal(true);
    protected toggleAssistantForm: FormGroup<{
        showAssistant: FormControl<boolean | null>
    }> = new FormGroup({
        showAssistant: new FormControl(false),
    });
    private assistant: WritableSignal<Tables<'assistants'> | null> = signal(null);

    constructor(
        private readonly assistantService: AssistantActionService,
        private readonly assistantStoreService: AssistantStoreService
    ) {
        this.assistant = this.assistantStoreService.assistant.getObject()
        this.isAssistantLoading = this.assistantStoreService.assistant.loading.getLoading()
        console.log('loading', this.isAssistantLoading())

        effect((): void => {
            this.toggleAssistantForm.patchValue({
                showAssistant: !this.assistant()?.skip_tutorial
            })
        })
    }

    protected async toggleAssistant(): Promise<void> {
        const newValue: boolean = this.toggleAssistantForm.value.showAssistant as boolean
        await this.assistantService.skipTutorial(newValue)
        await this.assistantService.updateLastTutorial('profile')
    }

}
