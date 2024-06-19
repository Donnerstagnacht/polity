import {Injectable} from '@angular/core';

type SearchGroupFlags = 'noResults';

@Injectable({
    providedIn: 'root'
})
export class SearchGroupStoreService {
    // public groupSearchResults: ArrayStoreService<SupabaseObjectReturn<'search_group'>, SearchGroupFlags>;
    // private uiFlags = {
    //     noResults: signal(false),
    // }
    //
    // constructor() {
    //     this.groupSearchResults = new ArrayStoreService<SupabaseObjectReturn<'search_group'>, SearchGroupFlags>(false, 20, this.uiFlags);
    // }
}
