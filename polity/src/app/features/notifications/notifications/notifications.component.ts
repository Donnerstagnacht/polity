import {Component} from '@angular/core';
import {NotificationsService} from "../services/notifications.service";

@Component({
    selector: 'polity-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.less']
})
export class NotificationsComponent {

    constructor(
        private readonly notificationsService: NotificationsService,
    ) {
    }

    async ngOnInit(): Promise<void> {
    }

}
