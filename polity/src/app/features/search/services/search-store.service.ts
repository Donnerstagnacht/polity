import {Injectable, signal, WritableSignal} from '@angular/core';
import {Profile} from "../../profile/types-and-interfaces/profile";
import {EntitiesStoreService} from "../../../shared/services/entities-store.service";

@Injectable({
    providedIn: 'root'
})
export class SearchStoreService {
    public profilSearchResults: EntitiesStoreService<Profile>;
    private profileSearchResults: WritableSignal<Profile[] | null> = signal(null);

    constructor() {
        this.profilSearchResults = new EntitiesStoreService<Profile>();
    }
}
