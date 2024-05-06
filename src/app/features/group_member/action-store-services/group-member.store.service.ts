import {Injectable} from '@angular/core';
import {ArrayStoreService} from "../../../signal-store/array-store.service";
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class GroupMemberStoreService {
    public groupMembers: ArrayStoreService<FunctionSingleReturn<'read_group_members'>>

    constructor() {
        this.groupMembers = new ArrayStoreService<FunctionSingleReturn<'read_group_members'>>();
    }
}
