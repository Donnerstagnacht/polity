import {Injectable} from '@angular/core';
import {SupabaseArrayReturnConditional} from "../../../../../supabase/types/supabase.shorthand-types";
import {ObjectStoreService} from "../../../signal-store/object-store.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileCountersStoreService {
    public profileCounters: ObjectStoreService<SupabaseArrayReturnConditional<'select_following_counter'>>;

    constructor() {
        this.profileCounters = new ObjectStoreService<SupabaseArrayReturnConditional<'select_following_counter'>>();
    }
}
