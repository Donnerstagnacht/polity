import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ArrayStoreService} from "../../../signal-store/array-store.service";

@Injectable({
    providedIn: 'root'
})
export class GroupInvitationsStoreService {
    public groupInvitations: ArrayStoreService<SupabaseObjectReturn<'read_group_member_invitations'>>;

    constructor() {
        this.groupInvitations = new ArrayStoreService<SupabaseObjectReturn<'read_group_member_invitations'>>();
    }
}
