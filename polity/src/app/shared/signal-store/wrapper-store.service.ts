import {inject, Injectable, WritableSignal} from '@angular/core';
import {TuiAlertService} from "@taiga-ui/core";
import {ErrorStoreService} from "./error-store.service";
import {LoadingStoreService} from "./loading-store.service";
import {UiFlagStoreService} from "./ui-flag-store.service";

@Injectable({
    providedIn: 'root'
})
export class WrapperStoreService<UiFlags extends Record<string, WritableSignal<boolean>>> {
    public readonly loading: LoadingStoreService;
    public readonly uiFlagStore: UiFlagStoreService<UiFlags>;
    private readonly tuiAlertService: TuiAlertService = inject(TuiAlertService);
    private readonly errorStoreService: ErrorStoreService = inject(ErrorStoreService);

    constructor() {
        this.loading = new LoadingStoreService();
        this.uiFlagStore = new UiFlagStoreService<UiFlags>();
    }

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
