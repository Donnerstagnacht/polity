import {inject, Injectable} from '@angular/core';
import {TuiAlertService} from "@taiga-ui/core";
import {ErrorStoreService} from "./error-store.service";
import {LoadingStoreService} from "./loading-store.service";
import {PostgrestSingleResponse} from "@supabase/supabase-js";

/**
 * Constructs an instance of the WrapperStore.
 *
 * @return {WrapperStoreService}
 */
@Injectable({
    providedIn: 'root'
})
export class WrapperStoreService<FlagKeyList extends string = string> {
    public readonly loading: LoadingStoreService;
    private readonly tuiAlertService: TuiAlertService = inject(TuiAlertService);
    private readonly errorStoreService: ErrorStoreService = inject(ErrorStoreService);

    constructor() {
        this.loading = new LoadingStoreService();
    }

    /**
     * It manages the loading and error handling of supabase select/read   api calls which throw errors.
     * Before the provided function is executed, the loading flag of the associated store is set to true.
     * After the provided function is executed, the loading flag of the associated store is set to false.
     *
     * If the call is successful, the data result is returned.
     * If an error occurs, the error is catched and handed over to the Error Store and displayed in the GUI.
     *
     * @template T - The type of the return value of the provided function.
     * @param {() => T} func - The function to be wrapped.
     * @param {boolean} showErrorMessage - If true, the error message will be displayed in the GUI.
     * @returns {Promise<T | Error>} - A promise that resolves to the result of the function
     * execution, or an Error object if an error occurred.
     */
    public async unwrapSelectApiCall<T>(
        func: () => T,
        showErrorMessage: boolean = true
    ): Promise<T | Error> {
        this.loading.startLoading()
        try {
            const result: Awaited<T> = await func();
            return result
        } catch (error: any) {
            if (showErrorMessage) {
                this.errorStoreService.updateError(error.message, true);
            }
            return error;
        } finally {
            this.loading.stopLoading()
        }
    }

    /**
     * It manages the loading and error handling of supabase select/read api calls which do not throw errors.
     * Before the provided function is executed, the loading flag of the associated store is set to true.
     * After the provided function is executed, the loading flag of the associated store is set to false.
     *
     * The PostgreSingleResponse object is always returned. It always holds an error and an data object.
     * If the call was successful, the data is not null and the error is null.
     * If the call was unsuccessful, the data is null and the error is not null.
     *
     * @template T - The type of the return value of the provided function.
     * @param {() => T} func - The function to be wrapped.
     * @param {boolean} showErrorMessage - If true, the error message will be displayed in the GUI.
     * @returns Promise<PostgrestSingleResponse<T>> - The return of the supabase api call.
     */
    public async manageSelectApiCall<T>(
        func: () => Promise<PostgrestSingleResponse<T>>,
        showErrorMessage: boolean = true
    ): Promise<PostgrestSingleResponse<T>> {
        this.loading.startLoading()
        const result: PostgrestSingleResponse<T> = await func();
        if (result.error) {
            if (showErrorMessage) {
                this.errorStoreService.updateError(result.error.message, true);
            }
        }
        this.loading.stopLoading()
        return result
    }

    /**
     * It manages the loading and error handling of supabase insert/update/delete api calls which throw errors.
     *
     * The PostgreSingleResponse object is always returned. It always holds an error and an data object.
     * If the call was successful, the error is null. However, the data can be null to if no data is returned.
     * If the call was unsuccessful, the data is null and the error is not null.
     *
     * If the call was successful, a successful feedback is displayed in the GUI.
     * If an error occurs, the error is handed over to the Error Store and displayed in the GUI.
     *
     * @template T - The type of the return value of the provided function.
     * @param {() => T} func - The function to be wrapped.
     * @param {boolean} showMessage - If true, a success message will be displayed in the GUI.
     * @param {string} successMessage - The message to be displayed in the GUI if the function is successful.
     * @param {boolean} showErrorMessage - If true, the error message will be displayed in the GUI.
     * @returns Promise<PostgrestSingleResponse<T>> - The return of the supabase api call.
     */
    public async unwrapUpdateUpdateApiCall<T>(
        func: () => T,
        showMessage: boolean = true,
        successMessage: string = 'Successful Update.',
        showErrorMessage: boolean = true
    ): Promise<T | Error> {
        try {
            const result: Awaited<T> = await func();
            if (showMessage) {
                this.tuiAlertService.open(
                    successMessage,
                    {
                        status: 'success',
                    }).subscribe()
            }
            return result
        } catch (error: any) {
            if (showErrorMessage) {
                this.errorStoreService.updateError(error.message, true);
            }
            return error;
        } finally {
        }
    }

    /**
     * It manages the loading and error handling of supabase insert/update/delete api calls which do not throw errors.
     *
     * The PostgreSingleResponse object is always returned. It always holds an error and an data object.
     * If the call was successful, the error is null. However, the data can be null to if no data is returned.
     * If the call was unsuccessful, the data is null and the error is not null.
     *
     * If the call was successful, a successful feedback is displayed in the GUI.
     * If an error occurs, the error is handed over to the Error Store and displayed in the GUI.
     *
     * @template T - The type of the return value of the provided function.
     * @param {() => T} func - The function to be wrapped.
     * @param {boolean} showMessage - If true, a success message will be displayed in the GUI.
     * @param {string} successMessage - The message to be displayed in the GUI if the function is successful.
     * @param {boolean} showErrorMessage - If true, the error message will be displayed in the GUI.
     * @returns Promise<PostgrestSingleResponse<T>> - The return of the supabase api call.
     */
    public async manageUpdateApiCall<T>(
        func: () => Promise<PostgrestSingleResponse<T>>,
        showMessage: boolean = true,
        successMessage: string = 'Successful Update.',
        showErrorMessage: boolean = true
    ): Promise<PostgrestSingleResponse<T>> {
        const result: PostgrestSingleResponse<T> = await func();
        if (!result.error) {
            if (showMessage) {
                this.tuiAlertService.open(
                    successMessage,
                    {
                        status: 'success',
                    }).subscribe()
            }
        }
        if (result.error) {
            if (showErrorMessage) {
                this.errorStoreService.updateError(result.error.message, true);
            }
        }
        return result
    }

}
