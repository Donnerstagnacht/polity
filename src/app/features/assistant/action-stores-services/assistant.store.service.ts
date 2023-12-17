import {Injectable} from '@angular/core';
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {ObjectStoreService} from "../../../signal-store/object-store.service";

@Injectable({
    providedIn: 'root'
})
export class AssistantStoreService {
    public assistant: ObjectStoreService<FunctionSingleReturn<'select_assistant'>>

    constructor() {
        this.assistant = new ObjectStoreService<FunctionSingleReturn<'select_assistant'>>();
    }
}
