import {Injectable} from '@angular/core';
import {Profile} from "../types-and-interfaces/profile";
import {EntityStoreService} from "../../../core/services/entity-store.service";
import {LoadingStoreService} from "../../../core/services/loading-store.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileStoreService {
    public profile: EntityStoreService<Profile>;
    public loading: LoadingStoreService;

    constructor() {
        this.profile = new EntityStoreService<Profile>();
        this.loading = new LoadingStoreService();
    }
}
