import {Injectable} from '@angular/core';
import {PlainFunctions} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../shared/signal-store/array-store.service";


@Injectable({
    providedIn: 'root'
})
export class SearchStoreService {
    public profilSearchResults: ArrayStoreService<PlainFunctions<'search_user'>, {}>;

    constructor() {
        this.profilSearchResults = new ArrayStoreService<PlainFunctions<'search_user'>, {}>;
    }
}
