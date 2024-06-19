import {TuiAlertService, TuiNotificationT} from "@taiga-ui/core";

/**
 * Displays an alert message using the provided TuiAlertService.
 *
 * @param {TuiAlertService} tuiAlertService - The TuiAlertService instance to use for displaying the alert.
 * @param {string} [message='Successful Update!'] - The message to display in the alert. Defaults to 'Successful Update!'.
 * @param {TuiNotificationT} [status='success'] - The status of the alert. Defaults to 'success'.
 * @return {void} This function does not return anything.
 */
export function showAlert(
    tuiAlertService: TuiAlertService,
    message: string = 'Successful Update!',
    status: TuiNotificationT = 'success',
): void {

    tuiAlertService.open(
        message,
        {
            status: status
        }
    ).subscribe()
}
