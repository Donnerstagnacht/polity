import {Injectable} from '@angular/core';
import {SupabaseArrayReturnConditional} from "../../../../../supabase/types/supabase.shorthand-types";
import {ObjectStoreService} from "../../../signal-store/object-store.service";

@Injectable({
    providedIn: 'root'
})
export class AssistantStoreService {
    public assistant: ObjectStoreService<SupabaseArrayReturnConditional<'select_assistant'>>

    constructor() {
        this.assistant = new ObjectStoreService<SupabaseArrayReturnConditional<'select_assistant'>>();
    }
}
