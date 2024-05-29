import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {AssistantStoreService} from "./assistant.store.service";
import {supabaseClient} from "../../../auth/supabase-client";

@Injectable({
    providedIn: 'root'
})
export class AssistantActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

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
        await this.assistantStoreService.assistant.wrapSelectFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<SupabaseObjectReturn<'read_assistant'>> = await this.supabaseClient
            .rpc('read_assistant')
            .single()
            .throwOnError();
            if (response.data) {
                this.assistantStoreService.assistant.mutateObject(response.data);
            }
        })
    }

    /**
     * Updates the first sign-in status and updates the assistant store.
     *
     * @param {boolean} newStatus - The new status to set for the first sign-in.
     * @return {Promise<void>}
     */
    public async updateFirstSignIn(newStatus: boolean): Promise<void> {
        await this.assistantStoreService.assistant.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<undefined> = await this.supabaseClient
            .rpc('update_first_sign_in', {_new_status: newStatus})
            .throwOnError()

            const updatedAssistant: SupabaseObjectReturn<'read_assistant'> = {
                first_sign_in_: newStatus,
            } as SupabaseObjectReturn<'read_assistant'>
            this.assistantStoreService.assistant.mutateObject(updatedAssistant)
        }, false)
    }

    /**
     * A function that updates the skip tutorial status and updates the assistant store.
     *
     * @param {boolean} newStatus - The new status for skipping the tutorial.
     * @return {Promise<void>}
     */
    public async skipTutorial(newStatus: boolean): Promise<void> {
        await this.assistantStoreService.assistant.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<undefined> = await this.supabaseClient
            .rpc('update_skip_tutorial', {_new_status: newStatus})
            .throwOnError()

            const updatedAssistant: SupabaseObjectReturn<'read_assistant'> = {
                skip_tutorial_: newStatus,
            } as SupabaseObjectReturn<'read_assistant'>
            this.assistantStoreService.assistant.mutateObject(updatedAssistant)
        }, true, 'You can reactivate your tutorials in your profile settings!')
    }

    /**
     * Updates the last tutorial status and the assistant store.
     *
     * @param {DatabaseOverwritten["public"]["Enums"]["tutorial_enum"]} last_tutorial - The new value for the last tutorial.
     * @return {Promise<void>}
     */
    public async updateLastTutorial(last_tutorial: DatabaseOverwritten["public"]["Enums"]["tutorial_enum"]): Promise<void> {
        await this.assistantStoreService.assistant.wrapUpdateFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<undefined> = await this.supabaseClient
            .rpc('update_last_tutorial', {_new_status: last_tutorial})
            .throwOnError()

            const updatedAssistant: SupabaseObjectReturn<'read_assistant'> = {
                last_tutorial_: last_tutorial,
            } as SupabaseObjectReturn<'read_assistant'>
            this.assistantStoreService.assistant.mutateObject(updatedAssistant)
        }, false)
    }
}
