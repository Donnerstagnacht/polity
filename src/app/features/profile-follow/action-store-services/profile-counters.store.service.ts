import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ObjectStoreService} from "../../../signal-store/object-store.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileCountersStoreService {
    public profileCounters: ObjectStoreService<SupabaseObjectReturn<'select_following_counter'>>;

    constructor() {
        this.profileCounters = new ObjectStoreService<SupabaseObjectReturn<'select_following_counter'>>();
    }
}
