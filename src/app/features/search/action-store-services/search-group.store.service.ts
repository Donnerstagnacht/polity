import {Injectable} from '@angular/core';
import {SupabaseArrayReturnConditional} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class SearchGroupStoreService {
    public groupSearchResults: ArrayStoreService<SupabaseArrayReturnConditional<'search_group'>>;

    constructor() {
        this.groupSearchResults = new ArrayStoreService<SupabaseArrayReturnConditional<'search_group'>>();
    }
}
