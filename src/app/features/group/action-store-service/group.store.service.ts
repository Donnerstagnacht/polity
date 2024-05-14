import {Injectable, signal, WritableSignal} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ObjectStoreService} from "../../../signal-store/object-store.service";

type GroupUIFlags =
    'isMember' |
    'isBoardMember' |
    'isFollowing' |
    'isFollowingCheckLoading' |
    'isGroupMemberLoading';

@Injectable({
    providedIn: 'root'
})
export class GroupStoreService {
    public group: ObjectStoreService<SupabaseObjectReturn<'read_group_columns'>, GroupUIFlags>
    public groupMemberStatus: WritableSignal<string> = signal('no_member')
    private uiFlags = {
        isMember: signal(false),
        isBoardMember: signal(false),
        isFollowing: signal(false),
        isFollowingCheckLoading: signal(true),
        isGroupMemberLoading: signal(true),
    }

    constructor() {
        this.group = new ObjectStoreService<SupabaseObjectReturn<'read_group_columns'>, GroupUIFlags>(this.uiFlags);
    }
}
