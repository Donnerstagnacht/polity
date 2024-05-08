import {Injectable} from '@angular/core';
import {ArrayStoreService} from "../../../signal-store/array-store.service";
import {SupabaseArrayReturnConditional} from "../../../../../supabase/types/supabase.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class GroupMemberStoreService {
    public groupMembers: ArrayStoreService<SupabaseArrayReturnConditional<'read_group_members'>>

    constructor() {
        this.groupMembers = new ArrayStoreService<SupabaseArrayReturnConditional<'read_group_members'>>();
    }
}
