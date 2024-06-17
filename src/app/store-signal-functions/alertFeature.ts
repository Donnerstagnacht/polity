import {TuiAlertService, TuiNotificationT} from "@taiga-ui/core";

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
