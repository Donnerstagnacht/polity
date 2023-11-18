import {Injectable} from '@angular/core';
import {SessionStoreService} from "../../../core/services/session-store.service";

@Injectable({
    providedIn: 'root'
})
export class NotificationsStoreService {

    constructor(
        private readonly sessionStoreService: SessionStoreService
    ) {
    }
}
