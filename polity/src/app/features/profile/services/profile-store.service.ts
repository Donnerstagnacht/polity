import {Injectable, signal, WritableSignal} from '@angular/core';
import {Profile} from "../types-and-interfaces/profile";
import {EntityStoreService} from "../../../shared/services/entity-store.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileStoreService {
    public profile: EntityStoreService<Profile>;
    private isOwner: WritableSignal<boolean> = signal(false);


    constructor() {
        this.profile = new EntityStoreService<Profile>();
    }

    public selectOwner(): WritableSignal<boolean> {
        return this.isOwner;
    }

    public setAsOwner(): void {
        this.isOwner.set(true)
    }

    public setNotAsOwner(): void {
        this.isOwner.set(false)
    }

}
