import {Injectable} from '@angular/core';
import {PlainFunctions} from "../../../../../supabase/types/supabase.shorthand-types";
import {ObjectStoreService} from "../../../signal-store/object-store.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileCountersStoreService {
    public profileCounters: ObjectStoreService<PlainFunctions<'select_following_counter'>, {}>;

    constructor() {
        this.profileCounters = new ObjectStoreService<PlainFunctions<'select_following_counter'>, {}>();
    }
}
