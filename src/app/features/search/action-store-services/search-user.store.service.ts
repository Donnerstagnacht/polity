import {Injectable} from '@angular/core';
import {SupabaseArrayReturnConditional} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";


@Injectable({
    providedIn: 'root'
})
export class SearchUserStoreService {
    public profilSearchResults: ArrayStoreService<SupabaseArrayReturnConditional<'search_user'>>;

    constructor() {
        this.profilSearchResults = new ArrayStoreService<SupabaseArrayReturnConditional<'search_user'>>;
    }
}
