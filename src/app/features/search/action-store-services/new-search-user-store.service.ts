import {Injectable, Signal} from '@angular/core';
import {BaseArrayStore} from "../../../store-signal-functions/array/base-array-store.service";
import {checkIfDataFound} from "../../../store-signal-functions/loadingFeature";
import {rpcArrayHandler} from "../../../store-signal-functions/array/rpcArrayHandlerFeature";


@Injectable({
    providedIn: 'root'
})
export class NewSearchUserStore extends BaseArrayStore<'search_user'> {

    public noDataFound: Signal<boolean> = checkIfDataFound(this.data_, this.loadingState_)

    public async searchUser(searchTerm: string): Promise<void> {
        await rpcArrayHandler(
            {
                fn: 'search_user',
                args: {_search_term: searchTerm}
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
                successMessage: 'Data found!'
            }
        )
    }
}

