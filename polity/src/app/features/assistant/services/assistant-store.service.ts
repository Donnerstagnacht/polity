import {Injectable, signal, WritableSignal} from '@angular/core';
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class AssistantStoreService {
    private assistant: WritableSignal<Tables<'assistants'> | null> = signal(null);

    constructor() {
    }

    /**
     * Returns an assistant as writable signal that notifies consumers about changes.
     *
     * @return {WritableSignal<Tables<'assistants'> | null>}
     */
    public selectAssistant(): WritableSignal<Tables<'assistants'> | null> {
        return this.assistant;
    }

    /**
     * Resets the assistant to null
     */
    public resetAssistant(): void {
        this.assistant.set(null);
    }

    /**
     * Updates the assistant with the provided data.
     *
     * @param {Tables<'assistants'> | null} assistant - The data to update the assistant with.
     * @return {void}
     */
    public mutateAssistant(assistant: Tables<'assistants'> | null): void {
        const mergeUpdatesWithStoreData: Tables<'assistants'> = {
            ...this.assistant(),
            ...assistant
        } as Tables<'assistants'>
        this.assistant.set(mergeUpdatesWithStoreData);
    }
}
