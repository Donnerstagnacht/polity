import {Injectable} from '@angular/core';
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";


@Injectable({
    providedIn: 'root'
})
export class SearchUserStoreService {
    public profilSearchResults: ArrayStoreService<FunctionSingleReturn<'search_user'>>;

    constructor() {
        this.profilSearchResults = new ArrayStoreService<FunctionSingleReturn<'search_user'>>;
    }
}
