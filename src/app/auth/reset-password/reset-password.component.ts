import {Component} from '@angular/core';
import {TuiIslandModule} from "@taiga-ui/kit";

@Component({
    selector: 'polity-reset-password',
    standalone: true,
    imports: [
        TuiIslandModule
    ],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.less'
})
export class ResetPasswordComponent {

}
