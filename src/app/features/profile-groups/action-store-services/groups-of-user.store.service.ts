import {Injectable} from '@angular/core';
import {ArrayStoreService} from "../../../signal-store/array-store.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";

@Injectable({
    providedIn: 'root'
})
export class GroupsOfUserStoreService {
    public groupsOfUser: ArrayStoreService<SupabaseObjectReturn<'read_groups_of_user'>>;

    constructor() {
        this.groupsOfUser = new ArrayStoreService<SupabaseObjectReturn<'read_groups_of_user'>>();
    }
}
