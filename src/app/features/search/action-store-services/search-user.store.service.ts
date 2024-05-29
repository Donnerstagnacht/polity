import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";


@Injectable({
    providedIn: 'root'
})
export class SearchUserStoreService {
    public profilSearchResults: ArrayStoreService<SupabaseObjectReturn<'search_user'>>;

    constructor() {
        this.profilSearchResults = new ArrayStoreService<SupabaseObjectReturn<'search_user'>>;
    }
}
