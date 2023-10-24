import { Component } from '@angular/core';
import {AuthenticationService} from "./core/services/authentication.service";
import {SessionStoreService} from "./core/services/session-store.service";

@Component({
  selector: 'polity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'polity';
  signingIn: boolean = true;
  constructor(
      private readonly authService: AuthenticationService,
      private sessionStoreService: SessionStoreService
  ) {
    this.authService.authChanges((_, session) => {
      this.sessionStoreService.updateSession(session);
      this.signingIn = session != null;
    })
  }
}
