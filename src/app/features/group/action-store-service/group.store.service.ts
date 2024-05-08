import {Injectable, signal, WritableSignal} from '@angular/core';
import {SupabaseArrayReturnConditional} from "../../../../../supabase/types/supabase.shorthand-types";
import {ObjectStoreService} from "../../../signal-store/object-store.service";

export type groupUiFlags = {
    isMember: WritableSignal<boolean>;
    isBoardMember: WritableSignal<boolean>;
    isFollowing: WritableSignal<boolean>;
    isFollowingCheckLoading: WritableSignal<boolean>;
    isGroupMemberLoading: WritableSignal<boolean>;
}

@Injectable({
    providedIn: 'root'
})
export class GroupStoreService {
    public group: ObjectStoreService<SupabaseArrayReturnConditional<'read_group_columns'>>
    private uiFlags: groupUiFlags = {
        isMember: signal(false),
        isBoardMember: signal(false),
        isFollowing: signal(false),
        isFollowingCheckLoading: signal(true),
        isGroupMemberLoading: signal(true)
    }

    constructor() {
        this.group = new ObjectStoreService<SupabaseArrayReturnConditional<'read_group_columns'>>(this.uiFlags);
    }
}
