import {Component, signal, WritableSignal} from '@angular/core';
import {NavigationItem} from "../../navigation/types-and-interfaces/navigationItem";
import {NAVIGATION_ITEMS} from "../../navigation/navigation-item";
import {FirstBarBottomComponent} from "../../navigation/first-bar-bottom/first-bar-bottom.component";
import {FirstBarLeftComponent} from "../../navigation/first-bar-left/first-bar-left.component";
import {RouterOutlet} from "@angular/router";
import {AssistantComponent} from "../assistant/assistant/assistant.component";
import {NotificationBadgeStoreService} from "../notifications/action-store-services/notification-badge.store.service";
import {SupabaseObjectReturn} from "../../../../supabase/types/supabase.authenticated.shorthand-types";
import {NotificationBadgeActionService} from "../notifications/action-store-services/notification-badge.action.service";

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
    protected items: NavigationItem[] = NAVIGATION_ITEMS;
    protected notificationBadge: WritableSignal<SupabaseObjectReturn<'read_unread_notifications_counter'> | null> = signal({
        profile_id_: '',
        unread_notifications_counter_: 50
    });

    constructor(
        private readonly notificationBadgeService: NotificationBadgeStoreService,
        private readonly notificationBadgeActionService: NotificationBadgeActionService
    ) {
        this.notificationBadge = this.notificationBadgeService.notificationBadge.getObject();
        this.notificationBadgeActionService.selectUnreadNotificationsCounter()
    }

}

