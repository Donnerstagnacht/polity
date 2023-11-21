import {Injectable, signal, WritableSignal} from '@angular/core';
import {Profile} from "../types-and-interfaces/profile";
import {EntityWrapperStoreService} from "../../../shared/services/entity-wrapper-store.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileStoreService {
    public profile: EntityWrapperStoreService<Profile>;
    private isOwner: WritableSignal<boolean> = signal(false);


    constructor() {
        this.profile = new EntityWrapperStoreService<Profile>();
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
