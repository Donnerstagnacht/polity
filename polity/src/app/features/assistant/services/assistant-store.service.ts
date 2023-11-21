import {Injectable} from '@angular/core';
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";
import {EntityWrapperStoreService} from "../../../shared/services/entity-wrapper-store.service";

@Injectable({
    providedIn: 'root'
})
export class AssistantStoreService {
    public assistant: EntityWrapperStoreService<Tables<'assistants'>>

    constructor() {
        this.assistant = new EntityWrapperStoreService<Tables<'assistants'>>();
    }
}
