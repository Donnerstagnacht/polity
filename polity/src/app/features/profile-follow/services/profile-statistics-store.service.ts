import {Injectable} from '@angular/core';
import {ProfileStatistics} from "../../profile/types-and-interfaces/profile-statistics";
import {EntityWrapperStoreService} from "../../../shared/services/entity-wrapper-store.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileStatisticsStoreService {
    public profileStatistics: EntityWrapperStoreService<ProfileStatistics>;

    constructor() {
        this.profileStatistics = new EntityWrapperStoreService<ProfileStatistics>();
    }
}
