import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {ArrayStoreService} from "../../../store-signal-class/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class GroupRequestsOfUserStoreService {
    public groupRequestsOfUser: ArrayStoreService<SupabaseObjectReturn<'read_group_requests_of_user'>>

    constructor() {
        this.groupRequestsOfUser = new ArrayStoreService<SupabaseObjectReturn<'read_group_requests_of_user'>>();
    }
}
