import {computed, Injectable} from '@angular/core';
import {BaseArrayStore} from '../../../store-signal-functions/array/base-array-store.service';
import {rpcArrayHandler} from '../../../store-signal-functions/array/rpcArrayHandlerFeature';
import {replaceSpacesWithPipe} from './search-utilities';

@Injectable()
export class SearchGroupStore extends BaseArrayStore<'search_group'> {

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
        this.resetState();
        searchTerm = replaceSpacesWithPipe(searchTerm);
        await rpcArrayHandler(
            {
                fn: 'search_group',
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
                successMessage: 'SearchGroup loaded!'
            }
        );
    }

}
