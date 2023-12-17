import {Component, effect, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TuiToggleModule} from "@taiga-ui/kit";
import {NotificationSettingsStoreService} from "../action-store-services/notification-settings.store.service";
import {NotificationSettingsActionService} from "../action-store-services/notification-settings.action.service";
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";

@Component({
    selector: 'polity-notfications-from-follow-toggle',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TuiToggleModule],
    templateUrl: './notfications-from-follow-toggle.component.html',
    styleUrl: './notfications-from-follow-toggle.component.less'
})
export class NotficationsFromFollowToggleComponent {
    isNotificationsFromUserLoading: WritableSignal<boolean> = signal(true);
    protected toggleNotificationsFromFollowForm: FormGroup<{
        showFollowNotifications: FormControl<boolean | null>
    }> = new FormGroup({
        showFollowNotifications: new FormControl(false),
    });
    private notificationSettings: WritableSignal<FunctionSingleReturn<'select_user_notification_settings'> | null> = signal(null);

    constructor(
        private notificationSettingsStore: NotificationSettingsStoreService,
        private notificationsSettingsActions: NotificationSettingsActionService
    ) {
        this.isNotificationsFromUserLoading = this.notificationSettingsStore.notificationSettings.loading.getLoading();
        console.log(this.isNotificationsFromUserLoading())
        this.notificationsSettingsActions.selectNotificationSettings();
        this.notificationSettings = this.notificationSettingsStore.notificationSettings.getObject();

        effect((): void => {
            this.toggleNotificationsFromFollowForm.patchValue({
                showFollowNotifications: this.notificationSettings()?.receive_follow_notifications
            })
        })
    }

    protected async toggleNotifications(): Promise<void> {
        const newValue: boolean = !this.toggleNotificationsFromFollowForm.value.showFollowNotifications as boolean
        console.log('newValue', newValue)
        await this.notificationsSettingsActions.updateNotificationsFromFollow(newValue);
    }
}
