import {Injectable} from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class <%= classify(name)%>Store extends BaseObjectStore<'<%= classify(rpc)%>'> {

    constructor() {
        super({

        });
    }

    public async read(userId: string): Promise<void> {
        const result = await rpcObjectHandler(
            {
                fn: '<%= classify(rpc)%>',
                args: {

                }
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
                successMessage: '<%= classify(name)%> loaded!'
            }
        )
    }

}
