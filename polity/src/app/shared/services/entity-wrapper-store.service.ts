import {inject, Injectable} from '@angular/core';
import {EntityStoreService} from "./entity-store.service";
import {ErrorStoreService} from "./error-store.service";
import {TuiAlertService} from "@taiga-ui/core";

@Injectable({
    providedIn: 'root'
})
export class EntityWrapperStoreService<T> extends EntityStoreService<T> {
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
