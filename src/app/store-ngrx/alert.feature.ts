import {signalStoreFeature, withMethods} from "@ngrx/signals";
import {TuiAlertService, TuiNotificationT} from "@taiga-ui/core";
import {inject} from "@angular/core";

export function withAlert() {
    return signalStoreFeature(
        withMethods((store) => {
            const tuiAlertService = inject(TuiAlertService);

            return {
                showAlert(
                    message: string = 'Successful Update!',
                    status: TuiNotificationT = 'success'
                ): void {

                    tuiAlertService.open(
                        message,
                        {
                            status: status
                        }
                    ).subscribe()
                }

            }
        })
    )
}
