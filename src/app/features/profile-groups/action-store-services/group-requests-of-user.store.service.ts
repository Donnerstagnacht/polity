import {Injectable} from '@angular/core';
import {ArrayStoreService} from "../../../signal-store/array-store.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class GroupRequestsOfUserStoreService {
    public groupRequestsOfUser: ArrayStoreService<SupabaseObjectReturn<'read_group_requests_of_user'>>

    constructor() {
        this.groupRequestsOfUser = new ArrayStoreService<SupabaseObjectReturn<'read_group_requests_of_user'>>();
    }
}
