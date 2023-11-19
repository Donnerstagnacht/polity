import {Injectable} from '@angular/core';
import {Profile} from "../types-and-interfaces/profile";
import {EntityStoreService} from "../../../core/services/entity-store.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileStoreService {
    public profile: EntityStoreService<Profile>;

    constructor() {
        this.profile = new EntityStoreService<Profile>();
    }
}
