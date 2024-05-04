import {Injectable} from '@angular/core';
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ObjectStoreService} from "../../../signal-store/object-store.service";

@Injectable({
    providedIn: 'root'
})
export class GroupCountersStoreService {
    public groupCounters: ObjectStoreService<FunctionSingleReturn<'read_group_following_counter'>>;

    constructor() {
        this.groupCounters = new ObjectStoreService<FunctionSingleReturn<'read_group_following_counter'>>();
    }
}
