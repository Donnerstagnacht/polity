import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {ArrayStoreService} from "../../../store-signal-class/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class GroupsOfUserStoreService {
    public groupsOfUser: ArrayStoreService<SupabaseObjectReturn<'read_groups_of_user'>>;

    constructor() {
        this.groupsOfUser = new ArrayStoreService<SupabaseObjectReturn<'read_groups_of_user'>>();
    }
}
