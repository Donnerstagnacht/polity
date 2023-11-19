import {Injectable} from '@angular/core';
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";
import {EntityStoreService} from "../../../shared/services/entity-store.service";

@Injectable({
    providedIn: 'root'
})
export class AssistantStoreService {
    public assistant: EntityStoreService<Tables<'assistants'>>

    constructor() {
        this.assistant = new EntityStoreService<Tables<'assistants'>>();
    }
}
