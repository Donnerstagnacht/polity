import {Injectable} from '@angular/core';
import {ProfileStatistics} from "../../profile/types-and-interfaces/profile-statistics";
import {EntityStoreService} from "../../../shared/services/entity-store.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileStatisticsStoreService {
    public profileStatistics: EntityStoreService<ProfileStatistics>;

    constructor() {
        this.profileStatistics = new EntityStoreService<ProfileStatistics>();
    }
}
