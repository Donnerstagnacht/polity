import {Injectable} from '@angular/core';
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.authenticated.shorthand-types";
import {ObjectStoreService} from "../../../store-signal-class/object-store.service";

@Injectable({
    providedIn: 'root'
})
export class AssistantStoreService {
    public assistant: ObjectStoreService<SupabaseObjectReturn<'read_assistant'>>

    constructor() {
        this.assistant = new ObjectStoreService<SupabaseObjectReturn<'read_assistant'>>();
    }
}
