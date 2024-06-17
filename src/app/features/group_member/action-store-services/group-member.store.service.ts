import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {ArrayStoreService} from "../../../store-signal-class/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class GroupMemberStoreService {
    public groupMembers: ArrayStoreService<SupabaseObjectReturn<'read_group_members'>>

    constructor() {
        this.groupMembers = new ArrayStoreService<SupabaseObjectReturn<'read_group_members'>>();
    }
}
