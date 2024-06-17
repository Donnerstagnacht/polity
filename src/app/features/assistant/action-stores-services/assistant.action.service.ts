import {Injectable} from '@angular/core';
import {PostgrestSingleResponse} from "@supabase/supabase-js";
import {DatabasePublicOverwritten} from "../../../../../supabase/types/supabase.public.modified";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {AssistantStoreService} from "./assistant.store.service";
import {supabaseAuthenticatedClient} from "../../../auth/supabase-authenticated-client";
import {DatabaseHiddenOverwritten} from "../../../../../supabase/types/supabase.hidden.modified";

@Injectable({
    providedIn: 'root'
})
export class AssistantActionService {
    private readonly supabaseClient = supabaseAuthenticatedClient;

    constructor(
        private readonly assistantStoreService: AssistantStoreService,
    ) {
    }

    /**
     * Selects an assistant for the specified user and updates the assistant store.
     *
     * @param {string} userId - The ID of the user.
     * @return {Promise<void>}
     */
    public async readAssistant(): Promise<void> {
        const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_assistant'>> = await this.assistantStoreService.assistant.manageSelectApiCall(async () => {
            return this.supabaseClient
            .rpc('read_assistant')
            .single()
            .throwOnError();
        })
        if (response.data) {
            this.assistantStoreService.assistant.mutateObject(response.data);
        }
    }

    /**
     * Updates the first sign-in status and updates the assistant store.
     *
     * @param {boolean} newStatus - The new status to set for the first sign-in.
     * @return {Promise<void>}
     */
    public async updateFirstSignIn(newStatus: boolean): Promise<void> {
        const response: PostgrestSingleResponse<undefined> = await this.assistantStoreService.assistant.manageUpdateApiCall(async () => {
            return this.supabaseClient
            .rpc('update_first_sign_in', {_new_status: newStatus})
        }, false)
        if (!response.error) {
            const updatedAssistant: SupabaseObjectReturn<'read_assistant'> = {
                first_sign_in_: newStatus,
            } as SupabaseObjectReturn<'read_assistant'>
            this.assistantStoreService.assistant.mutateObject(updatedAssistant)
        }
    }

    /**
     * A function that updates the skip tutorial status and updates the assistant store.
     *
     * @param {boolean} newStatus - The new status for skipping the tutorial.
     * @return {Promise<void>}
     */
    public async skipTutorial(newStatus: boolean): Promise<void> {
        const response: PostgrestSingleResponse<undefined> = await this.assistantStoreService.assistant.manageUpdateApiCall(async () => {
            return this.supabaseClient
            .rpc('update_skip_tutorial', {_new_status: newStatus})

        }, true, 'You can reactivate your tutorials in your profile settings!')
        if (!response.error) {
            const updatedAssistant: SupabaseObjectReturn<'read_assistant'> = {
                skip_tutorial_: newStatus,
            } as SupabaseObjectReturn<'read_assistant'>
            this.assistantStoreService.assistant.mutateObject(updatedAssistant)
        }
    }

    /**
     * Updates the last tutorial status and the assistant store.
     *
     * @param {DatabasePublicOverwritten["public"]["Enums"]["tutorial_enum"]} last_tutorial - The new value for the last tutorial.
     * @return {Promise<void>}
     */
    public async updateLastTutorial(last_tutorial: DatabaseHiddenOverwritten["hidden"]["Enums"]["tutorial_enum"]): Promise<void> {
        const response: PostgrestSingleResponse<undefined> = await this.assistantStoreService.assistant.manageUpdateApiCall(async () => {
            return this.supabaseClient
            .rpc('update_last_tutorial', {_new_status: last_tutorial})
            .throwOnError()

        }, false)
        if (!response.error) {
            const updatedAssistant: SupabaseObjectReturn<'read_assistant'> = {
                last_tutorial_: last_tutorial,
            } as SupabaseObjectReturn<'read_assistant'>
            this.assistantStoreService.assistant.mutateObject(updatedAssistant)
        }
    }
}
