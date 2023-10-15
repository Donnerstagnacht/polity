import { Component } from '@angular/core';
import {AuthentificationService} from "./core/authentification.service";
import {AuthSession} from "@supabase/supabase-js";
import {SessionStoreService} from "./core/session-store.service";

@Component({
  selector: 'polity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'polity';
  session: AuthSession | null = this.authService.session;

  constructor(
      private readonly authService: AuthentificationService,
      private sessionStoreService: SessionStoreService

  ) {
    this.authService.authChanges((_, session) => {
      this.session = session
      this.sessionStoreService.updateSession(session);
    })
  }
}
