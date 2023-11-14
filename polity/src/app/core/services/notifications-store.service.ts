import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationsStoreService {
    private notification: WritableSignal<string> = signal('')
    private showNotification: WritableSignal<boolean> = signal(false);

    /**
     * Updates the global notification signal.
     *
     * @param {string} notification - The new notification message to be set.
     * @param {boolean} newStatus - The new status to be set. if set to true, message wil be shown in UI.
     * @return {void}
     */
    public updateNotification(notification: string, newStatus: boolean): void {
        this.notification.set(notification);
        this.setNotificationStatus(newStatus);
    }

    /**
     * Sets the notification status.
     *
     * @param {boolean} newStatus - The new status to be set. if set to true, message wil be shown in UI.
     * @return {void}
     */
    public setNotificationStatus(newStatus: boolean): void {
        this.showNotification.set(newStatus);
    }

    /**
     * Returns the global notification as `WritableSignal` that notifies consumers if it changes
     *
     * @return {WritableSignal<string>}
     */
    public selectNotification(): WritableSignal<string> {
        return this.notification;
    }

    /**
     * Returns the global status if a notification should be shown as 'WritableSignal' that notifies consumers of
     * changes
     *
     * @return {WritableSignal<boolean>}
     */
    public selectShowNotification(): WritableSignal<boolean> {
        return this.showNotification;
    }
}
