import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AssistantComponent} from '../assistant/assistant/assistant.component';
import {FirstBarBottomComponent} from '@polity-navigation/first-bar/first-bar-bottom/first-bar-bottom.component';
import {FirstBarLeftComponent} from '@polity-navigation/first-bar/first-bar-left/first-bar-left.component';
import {NavigationItem} from '@polity-navigation/types-and-interfaces/navigationItem';
import {NAVIGATION_ITEMS} from '@polity-navigation/navigation-item';
import {NotificationCounterStore} from '@polity-office/notification-state/notification-counter.store';

@Component({
    selector: 'polity-app-skeleton',
    templateUrl: './app-skeleton.router.html',
    styleUrls: ['./app-skeleton.router.less'],
    imports: [
        FirstBarBottomComponent,
        FirstBarLeftComponent,
        RouterOutlet,
        AssistantComponent
    ],
    standalone: true
})
export class AppSkeletonRouter {
    protected notificationCounterStore: NotificationCounterStore = inject(NotificationCounterStore);
    protected items: NavigationItem[] = NAVIGATION_ITEMS;

    constructor() {
        this.notificationCounterStore.read();
    }

}

