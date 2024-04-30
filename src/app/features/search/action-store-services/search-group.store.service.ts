import {Injectable} from '@angular/core';
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class SearchGroupStoreService {
    public groupSearchResults: ArrayStoreService<FunctionSingleReturn<'search_group'>>;

    constructor() {
        this.groupSearchResults = new ArrayStoreService<FunctionSingleReturn<'search_group'>>();
    }
}
