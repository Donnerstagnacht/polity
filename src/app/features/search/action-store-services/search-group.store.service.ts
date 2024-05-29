import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class SearchGroupStoreService {
    public groupSearchResults: ArrayStoreService<SupabaseObjectReturn<'search_group'>>;

    constructor() {
        this.groupSearchResults = new ArrayStoreService<SupabaseObjectReturn<'search_group'>>();
    }
}
