import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class GroupRequestsStoreService {
    public groupRequests: ArrayStoreService<SupabaseObjectReturn<'read_group_member_requests'>>

    constructor() {
        this.groupRequests = new ArrayStoreService<SupabaseObjectReturn<'read_group_member_requests'>>();
    }
}
