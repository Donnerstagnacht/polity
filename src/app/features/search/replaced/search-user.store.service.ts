import {Injectable} from '@angular/core';

type SearchUserFlags = 'noResults';

@Injectable({
    providedIn: 'root'
})
export class SearchUserStoreService {
    // public profilSearchResults: ArrayStoreService<SupabaseObjectReturn<'search_user'>, SearchUserFlags>;
    // private uiFlags = {
    //     noResults: signal(false),
    // }
    //
    // constructor() {
    //     this.profilSearchResults = new ArrayStoreService<SupabaseObjectReturn<'search_user'>, SearchUserFlags>(false, 20, this.uiFlags);
    // }
}
