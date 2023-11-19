import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {DatabaseModified} from "../../../../../supabase/types/supabase.modified";
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";
import {SessionStoreService} from "../../../core/services/session-store.service";
import {AssistantStoreService} from "./assistant-store.service";
import {supabaseClient} from "../../../shared/services/supabase-client";
import {ErrorStoreService} from "../../../shared/services/error-store.service";

@Injectable({
    providedIn: 'root'
})
export class AssistantService {
    private readonly supabaseClient: SupabaseClient<DatabaseModified> = supabaseClient;

    constructor(
        private readonly notificationService: ErrorStoreService,
        private readonly sessionStoreService: SessionStoreService,
        private readonly assistantStoreService: AssistantStoreService
    ) {
    }

    /**
     * Selects an assistant for the specified user and updates the assistant store.
     *
     * @param {string} userId - The ID of the user.
     * @return {Promise<void>}
     */
    public async selectAssistant(userId: string): Promise<void> {
        try {
            const response: PostgrestSingleResponse<Tables<'assistants'>> = await this.supabaseClient
            .rpc('select_assistant', {user_id: userId})
            .single()
            .throwOnError();
            if (response.data) {
                this.assistantStoreService.assistant.mutateEntity(response.data);
            }
        } catch (error: any) {
            this.notificationService.updateError(error.message, true);
        }
    }

    /**
     * Updates the first sign-in status and updates the assistant store.
     *
     * @param {boolean} newStatus - The new status to set for the first sign-in.
     * @return {Promise<void>}
     */
    public async updateFirstSignIn(newStatus: boolean): Promise<void> {
        try {
            const sessionId: string = this.sessionStoreService.sessionId() as string;
            const response: PostgrestSingleResponse<undefined> = await this.supabaseClient
            .rpc('update_first_sign_in', {user_id: sessionId, new_status: newStatus})
            .throwOnError()

            const updatedAssistant: Tables<'assistants'> = {
                first_sign_in: newStatus,
            } as Tables<'assistants'>
            this.assistantStoreService.assistant.mutateEntity(updatedAssistant)
        } catch (error: any) {
            this.notificationService.updateError(error.message, true);
        }
    }

    /**
     * A function that updates the skip tutorial status and updates the assistant store.
     *
     * @param {boolean} newStatus - The new status for skipping the tutorial.
     * @return {Promise<void>}
     */
    public async skipTutorial(newStatus: boolean): Promise<void> {
        try {
            const sessionId: string = this.sessionStoreService.sessionId() as string;
            const response: PostgrestSingleResponse<undefined> = await this.supabaseClient
            .rpc('update_skip_tutorial', {user_id: sessionId, new_status: newStatus})
            .throwOnError()

            const updatedAssistant: Tables<'assistants'> = {
                skip_tutorial: newStatus,
            } as Tables<'assistants'>
            this.assistantStoreService.assistant.mutateEntity(updatedAssistant)
        } catch (error: any) {
            this.notificationService.updateError(error.message, true);
        }
    }

    /**
     * Updates the last tutorial status and the assistant store.
     *
     * @param {DatabaseModified["public"]["Enums"]["tutorial_enum"]} last_tutorial - The new value for the last tutorial.
     * @return {Promise<void>}
     */
    public async updateLastTutorial(last_tutorial: DatabaseModified["public"]["Enums"]["tutorial_enum"]): Promise<void> {
        try {
            const sessionId: string = this.sessionStoreService.sessionId() as string;
            const response: PostgrestSingleResponse<undefined> = await this.supabaseClient
            .rpc('update_last_tutorial', {user_id: sessionId, new_status: last_tutorial})
            .throwOnError()

            const updatedAssistant: Tables<'assistants'> = {
                last_tutorial: last_tutorial,
            } as Tables<'assistants'>
            this.assistantStoreService.assistant.mutateEntity(updatedAssistant)
        } catch (error: any) {
            this.notificationService.updateError(error.message, true);
        }
    }
}
