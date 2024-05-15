import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class GroupInvitationsOfUserStoreService {
    public groupInvitationsOfUser: ArrayStoreService<SupabaseObjectReturn<'read_group_member_invitations_of_user'>>;

    constructor() {
        this.groupInvitationsOfUser = new ArrayStoreService<SupabaseObjectReturn<'read_group_member_invitations_of_user'>>();
    }
}
