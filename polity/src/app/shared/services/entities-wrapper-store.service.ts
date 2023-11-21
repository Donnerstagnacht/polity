import {inject, Injectable} from '@angular/core';
import {EntitiesStoreService} from "./entities-store.service";
import {TuiAlertService} from "@taiga-ui/core";
import {ErrorStoreService} from "./error-store.service";

@Injectable({
    providedIn: 'root'
})
export class EntitiesWrapperStoreService<T> extends EntitiesStoreService<T> {
    private readonly tuiAlertService: TuiAlertService = inject(TuiAlertService);
    private readonly errorStoreService: ErrorStoreService = inject(ErrorStoreService);

    constructor() {
        super();
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
            console.log('before execution')
            const result: Awaited<T> = await func();
            console.log('after execution')
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
