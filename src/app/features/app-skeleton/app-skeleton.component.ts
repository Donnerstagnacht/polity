import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AssistantComponent} from '../assistant/assistant/assistant.component';
import {NotificationCounterStore} from '../notifications/state/notification-counter.store';
import {FirstBarBottomComponent} from '@polity-navigation/first-bar/first-bar-bottom/first-bar-bottom.component';
import {FirstBarLeftComponent} from '@polity-navigation/first-bar/first-bar-left/first-bar-left.component';
import {NavigationItem} from '@polity-navigation/types-and-interfaces/navigationItem';
import {NAVIGATION_ITEMS} from '@polity-navigation/navigation-item';

@Component({
    selector: 'polity-app-skeleton',
    templateUrl: './app-skeleton.component.html',
    styleUrls: ['./app-skeleton.component.less'],
    imports: [
        FirstBarBottomComponent,
        FirstBarLeftComponent,
        RouterOutlet,
        AssistantComponent
    ],
    standalone: true
})
export class AppSkeletonComponent {
    protected notificationCounterStore: NotificationCounterStore = inject(NotificationCounterStore);
    protected items: NavigationItem[] = NAVIGATION_ITEMS;

    constructor() {
        this.notificationCounterStore.read();
    }

}

