import {Inject, inject, Injectable} from '@angular/core';
import {TuiAlertService} from "@taiga-ui/core";
import {ErrorStoreService} from "./error-store.service";
import {LoadingStoreService} from "./loading-store.service";
import {DictionaryOfBooleans, UiFlagStoreService} from "./ui-flag-store.service";

@Injectable({
    providedIn: 'root'
})
export class WrapperStoreService {
    public readonly loading: LoadingStoreService;
    public readonly uiFlagStore: UiFlagStoreService;
    private readonly tuiAlertService: TuiAlertService = inject(TuiAlertService);
    private readonly errorStoreService: ErrorStoreService = inject(ErrorStoreService);

    /**
     * Constructs an instance of the WrapperStore.
     *
     * @param {DictionaryOfBooleans} initialUiFlags - uiFlags - Optional object that contains UI flags associated with the store. Defaults to an empty object.
     * @return {WrapperStoreService}
     */
    constructor(@Inject({}) private readonly initialUiFlags: DictionaryOfBooleans = {}) {
        this.loading = new LoadingStoreService();
        this.uiFlagStore = new UiFlagStoreService(this.initialUiFlags);
    }

    /**
     * Wraps a provided function in an async wrapper and handles loading and error handling.
     * Before the provided function is executed, the loading flag of the associated store is set to true.
     * After the provided function is executed, the loading flag of the associated store is set to false.
     *
     * If an error occurs, the error is handed over to the Error Store and displayed in the GUI.
     *
     * @template T - The type of the return value of the provided function.
     * @param {() => T} func - The function to be wrapped.
     * @returns {Promise<T | Error>} - A promise that resolves to the result of the function
     * execution, or an Error object if an error occurred.
     */
    public async wrapSelectFunction<T>(func: () => T): Promise<T | Error> {
        this.loading.startLoading()
        try {
            const result: Awaited<T> = await func();
            return result
        } catch (error: any) {
            this.errorStoreService.updateError(error.message, true);
            return error;
        } finally {
            this.loading.stopLoading()
        }
    }

    /**
     * Wraps a provided function in an async wrapper and handles errors.
     * If an error occurs, the error is handed over to the Error Store and displayed in the GUI.
     * If the function is successful, a successful feedback is displayed in the GUI.
     *
     * @template T - The type of the return value of the provided function.
     * @param {() => T} func - The function to be wrapped.
     * @returns {Promise<T | Error>} - A promise that resolves to the result of the function
     * execution, or an Error object if an error occurred.
     */
    public async wrapUpdateFunction<T>(func: () => T): Promise<T | Error> {
        try {
            const result: Awaited<T> = await func();
            this.tuiAlertService.open(
                'Successful Update.',
                {
                    status: 'success',
                }).subscribe()
            return result
        } catch (error: any) {
            this.errorStoreService.updateError(error.message, true);
            return error;
        } finally {
        }
    }

}
