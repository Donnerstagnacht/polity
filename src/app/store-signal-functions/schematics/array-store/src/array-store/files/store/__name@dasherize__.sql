import {Injectable} from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class <%= classify(name)%>Store extends BaseArrayStore<''> {

    public async read(): Promise<void> {
        await rpcArrayHandler(
            {
                fn: '',
            },
            {
                useLoading: true,
                loadingState: this.loadingState_
            },
            {
                useStore: true,
                dataState: this.data_
            },
            {
                useError: true,
                errorStoreService: this.errorStoreService
            },
            {
                useSuccess: true,
                alertService: this.tuiAlertService,
                successMessage: ''
            }
        )
    }
    
}
