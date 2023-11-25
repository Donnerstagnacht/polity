import {Injectable} from '@angular/core';
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";
import {ObjectStoreService} from "../../../signal-store/object-store.service";

@Injectable({
    providedIn: 'root'
})
export class AssistantStoreService {
    public assistant: ObjectStoreService<Tables<'assistants'>>

    constructor() {
        this.assistant = new ObjectStoreService<Tables<'assistants'>>();
    }
}
