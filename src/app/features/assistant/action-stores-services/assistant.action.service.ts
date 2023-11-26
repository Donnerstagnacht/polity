import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {DatabaseOverwritten} from "../../../../../supabase/types/supabase.modified";
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";
import {SessionStoreService} from "../../../auth/services/session-store.service";
import {AssistantStoreService} from "./assistant.store.service";
import {supabaseClient} from "../../../auth/supabase-client";

@Injectable({
    providedIn: 'root'
})
export class AssistantActionService {
    private readonly supabaseClient: SupabaseClient<DatabaseOverwritten> = supabaseClient;

    constructor(
        private readonly sessionStoreService: SessionStoreService,
        private readonly assistantStoreService: AssistantStoreService,
    ) {
    }

    /**
     * Selects an assistant for the specified user and updates the assistant store.
     *
     * @param {string} userId - The ID of the user.
     * @return {Promise<void>}
     */
    public async selectAssistant(userId: string): Promise<void> {
        await this.assistantStoreService.assistant.wrapSelectFunction(async (): Promise<void> => {
            const response: PostgrestSingleResponse<Tables<'assistants'>> = await this.supabaseClient
            .rpc('select_assistant', {user_id: userId})
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
            const sessionId: string = this.sessionStoreService.getSessionId() as string;
            const response: PostgrestSingleResponse<undefined> = await this.supabaseClient
            .rpc('update_first_sign_in', {user_id: sessionId, new_status: newStatus})
            .throwOnError()

            const updatedAssistant: Tables<'assistants'> = {
                first_sign_in: newStatus,
            } as Tables<'assistants'>
            this.assistantStoreService.assistant.mutateObject(updatedAssistant)
        })
    }

    /**
     * A function that updates the skip tutorial status and updates the assistant store.
     *
     * @param {boolean} newStatus - The new status for skipping the tutorial.
     * @return {Promise<void>}
     */
    public async skipTutorial(newStatus: boolean): Promise<void> {
        await this.assistantStoreService.assistant.wrapUpdateFunction(async (): Promise<void> => {
            const sessionId: string = this.sessionStoreService.getSessionId() as string;
            const response: PostgrestSingleResponse<undefined> = await this.supabaseClient
            .rpc('update_skip_tutorial', {user_id: sessionId, new_status: newStatus})
            .throwOnError()

            const updatedAssistant: Tables<'assistants'> = {
                skip_tutorial: newStatus,
            } as Tables<'assistants'>
            this.assistantStoreService.assistant.mutateObject(updatedAssistant)
        })
    }

    /**
     * Updates the last tutorial status and the assistant store.
     *
     * @param {DatabaseOverwritten["public"]["Enums"]["tutorial_enum"]} last_tutorial - The new value for the last tutorial.
     * @return {Promise<void>}
     */
    public async updateLastTutorial(last_tutorial: DatabaseOverwritten["public"]["Enums"]["tutorial_enum"]): Promise<void> {
        await this.assistantStoreService.assistant.wrapUpdateFunction(async (): Promise<void> => {
            const sessionId: string = this.sessionStoreService.getSessionId() as string;
            const response: PostgrestSingleResponse<undefined> = await this.supabaseClient
            .rpc('update_last_tutorial', {user_id: sessionId, new_status: last_tutorial})
            .throwOnError()

            const updatedAssistant: Tables<'assistants'> = {
                last_tutorial: last_tutorial,
            } as Tables<'assistants'>
            this.assistantStoreService.assistant.mutateObject(updatedAssistant)
        })
    }
}
