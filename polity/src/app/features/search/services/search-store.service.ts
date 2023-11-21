import {Injectable, signal, WritableSignal} from '@angular/core';
import {Profile} from "../../profile/types-and-interfaces/profile";
import {EntitiesWrapperStoreService} from "../../../shared/services/entities-wrapper-store.service";

@Injectable({
    providedIn: 'root'
})
export class SearchStoreService {
    public profilSearchResults: EntitiesWrapperStoreService<Profile>;
    private profileSearchResults: WritableSignal<Profile[] | null> = signal(null);

    constructor() {
        this.profilSearchResults = new EntitiesWrapperStoreService<Profile>();
    }
}
