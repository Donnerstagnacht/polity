import {Injectable} from '@angular/core';
import {ErrorStoreService} from "./error-store.service";

@Injectable({
    providedIn: 'root'
})
export class WrapperCodeService {

    constructor(private readonly errorStoreService: ErrorStoreService) {
    }

    public wrapFunction<T>(func: () => T): T | Error {
        try {
            return func();
        } catch (error: any) {
            this.errorStoreService.updateError(error.message, true);
            return error;
        }
    }
}
