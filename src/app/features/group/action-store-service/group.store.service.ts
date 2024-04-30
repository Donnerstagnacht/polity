import {Injectable, signal, WritableSignal} from '@angular/core';
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ObjectStoreService} from "../../../signal-store/object-store.service";

export type groupUiFlags = {
    isMember: WritableSignal<boolean>;
    isBoardMember: WritableSignal<boolean>;
    isFollowing: WritableSignal<boolean>;
}

@Injectable({
    providedIn: 'root'
})
export class GroupStoreService {
    public group: ObjectStoreService<FunctionSingleReturn<'read_group_columns'>>
    private uiFlags: groupUiFlags = {
        isMember: signal(false),
        isBoardMember: signal(false),
        isFollowing: signal(false),
    }

    constructor() {
        this.group = new ObjectStoreService<FunctionSingleReturn<'read_group_columns'>>(this.uiFlags);
    }
}
