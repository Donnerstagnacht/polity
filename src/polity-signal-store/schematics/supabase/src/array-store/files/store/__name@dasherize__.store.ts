import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class <%= classify(name)%>Store extends BaseArrayStore<'<%= classify(rpc)%>'> {

    constructor() {
        super({
            loading: false,
            dataRequested: false
        });
    }

    public async read(): Promise<void> {
        await rpcArrayHandler(
            {
                fn: '<%= classify(rpc)%>',
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
                useSuccess: false
            }
        )
    }

    public async update(): Promise<void> {
        const result =await rpcArrayHandler(
            {
                fn: '<%= classify(rpc)%>',
            },
            {
                useLoading: false
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
                successMessage: '<%= classify(name)%> loaded!'
            }
        )
        if(!result().error) {

        }
    }

}
