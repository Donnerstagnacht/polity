import {Component, effect, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiToggleModule} from '@taiga-ui/kit';
import {NotificationSettingsStore} from '../store/notification-settings.store';

@Component({
    selector: 'polity-notfications-from-follow-toggle',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TuiToggleModule],
    templateUrl: './notfications-from-follow-toggle.component.html',
    styleUrl: './notfications-from-follow-toggle.component.less'
})
export class NotficationsFromFollowToggleComponent {
    protected notificationSettingsStore: NotificationSettingsStore = inject(NotificationSettingsStore);

    protected toggleNotificationsFromFollowForm: FormGroup<{
        showFollowNotifications: FormControl<boolean | null>
    }> = new FormGroup({
        showFollowNotifications: new FormControl(this.notificationSettingsStore.data().receive_follow_notifications_)
    });

    constructor() {
        this.notificationSettingsStore.read();

        effect((): void => {
            this.toggleNotificationsFromFollowForm.patchValue({
                showFollowNotifications: this.notificationSettingsStore.data().receive_follow_notifications_
            });
        });
    }

    protected async toggleNotifications(): Promise<void> {
        const newValue: boolean = !this.toggleNotificationsFromFollowForm.value.showFollowNotifications as boolean;
        this.notificationSettingsStore.update(newValue);
    }
}
