import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ObjectStoreService} from "../../../signal-store/object-store.service";

@Injectable({
    providedIn: 'root'
})
export class AssistantStoreService {
    public assistant: ObjectStoreService<SupabaseObjectReturn<'read_assistant'>>

    constructor() {
        this.assistant = new ObjectStoreService<SupabaseObjectReturn<'read_assistant'>>();
    }
}
