import {computed, Injectable} from '@angular/core';
import {replaceSpacesWithPipe} from './search-utilities';
import {BaseArrayStore} from '@polity-signal-store/array/base-array-store.service';
import {rpcArrayHandler} from '@polity-signal-store/array/rpcArrayHandlerFeature';

@Injectable()
export class SearchUserStore extends BaseArrayStore<'search_user'> {

    public noData = computed((): boolean => {
        if (this.data_().length > 0) {
            return false;
        } else {
            return true;
        }
    });

    constructor() {
        super({
            loading: false,
            dataRequested: false
        });
    }

    public async search(searchTerm: string): Promise<void> {
        searchTerm = replaceSpacesWithPipe(searchTerm);
        this.emptyStore();
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
                successMessage: 'SearchUser loaded!'
            }
        );
    }

}
