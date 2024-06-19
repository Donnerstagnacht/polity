import {Injectable} from '@angular/core';
import {ObjectStoreService} from "../../../signal-store/object-store.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class ProfileCountersStoreService {
    public profileCounters: ObjectStoreService<SupabaseObjectReturn<'read_profile_counters'>>;

    constructor() {
        this.profileCounters = new ObjectStoreService<SupabaseObjectReturn<'read_profile_counters'>>();
    }
}

