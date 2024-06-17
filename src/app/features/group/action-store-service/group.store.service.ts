import {Injectable, signal, WritableSignal} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {ObjectStoreService} from "../../../store-signal-class/object-store.service";

type GroupUIFlags =
    'isMember' |
    'isBoardMember' |
    'isInvited' |
    'isRequested' |
    'isNotMember' |
    'isFollowing' |
    'isFollowingCheckLoading' |
    'isGroupMembershipStatusLoading';

@Injectable({
    providedIn: 'root'
})
export class GroupStoreService {
    public group: ObjectStoreService<SupabaseObjectReturn<'read_group'>, GroupUIFlags>
    public groupMemberStatus: WritableSignal<string> = signal('no_member')
    private uiFlags = {
        isMember: signal(false),
        isBoardMember: signal(false),
        isInvited: signal(false),
        isRequested: signal(false),
        isNotMember: signal(false),
        isFollowing: signal(false),
        isFollowingCheckLoading: signal(true),
        isGroupMembershipStatusLoading: signal(true),
    }

    constructor() {
        this.group = new ObjectStoreService<SupabaseObjectReturn<'read_group'>, GroupUIFlags>(this.uiFlags);
    }
}
