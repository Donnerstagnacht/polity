import {Component} from '@angular/core';
import {TuiButtonModule} from '@taiga-ui/core';
import {AuthenticationService} from '../../state/authentication.service';

@Component({
    selector: 'polity-sign-out',
    templateUrl: './sign-out.component.html',
    styleUrls: ['./sign-out.component.less'],
    standalone: true,
    imports: [TuiButtonModule]
})
export class SignOutComponent {

    constructor(
        private readonly authService: AuthenticationService
    ) {
    }

    protected async signOut(): Promise<void> {
        this.authService.signOut();
    }
}
