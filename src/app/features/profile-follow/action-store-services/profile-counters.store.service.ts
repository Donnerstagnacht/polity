import {Injectable} from '@angular/core';
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ObjectStoreService} from "../../../signal-store/object-store.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileCountersStoreService {
    public profileCounters: ObjectStoreService<FunctionSingleReturn<'select_following_counter'>>;

    constructor() {
        this.profileCounters = new ObjectStoreService<FunctionSingleReturn<'select_following_counter'>>();
    }
}
