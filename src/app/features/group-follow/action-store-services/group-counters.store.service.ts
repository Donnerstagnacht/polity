import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ObjectStoreService} from "../../../signal-store/object-store.service";

@Injectable({
    providedIn: 'root'
})
export class GroupCountersStoreService {
    public groupCounters: ObjectStoreService<SupabaseObjectReturn<'read_group_counter'>>;

    constructor() {
        this.groupCounters = new ObjectStoreService<SupabaseObjectReturn<'read_group_counter'>>();
    }
}
