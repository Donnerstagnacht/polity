import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {ObjectStoreService} from "../../../store-signal-class/object-store.service";

@Injectable({
    providedIn: 'root'
})
export class GroupCountersStoreService {
    public groupCounters: ObjectStoreService<SupabaseObjectReturn<'read_group_counters'>>;

    constructor() {
        this.groupCounters = new ObjectStoreService<SupabaseObjectReturn<'read_group_counters'>>();
    }
}
