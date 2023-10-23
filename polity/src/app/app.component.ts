import { Component } from '@angular/core';
import {AuthentificationService} from "./core/authentification.service";
import {AuthSession} from "@supabase/supabase-js";
import {SessionStoreService} from "./core/session-store.service";
import {Router} from "@angular/router";

@Component({
  selector: 'polity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'polity';
  session: AuthSession | null = this.authService.session;
  signingIn: boolean = true;
  constructor(
      private readonly authService: AuthentificationService,
      private sessionStoreService: SessionStoreService,
      private router: Router
  ) {
    this.authService.authChanges((_, session) => {
      this.session = session
      this.sessionStoreService.updateSession(session);
      if(session != null) {
        this.signingIn = true;
      } else {
        this.signingIn = false;
        // this.router.navigate(['/login']);
      }
    })
  }
}
