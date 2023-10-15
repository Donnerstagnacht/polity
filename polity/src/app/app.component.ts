import { Component } from '@angular/core';
import {AuthentificationService} from "./core/authentification.service";
import {AuthSession} from "@supabase/supabase-js";

@Component({
  selector: 'polity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'polity';
  session: AuthSession | null = this.authService.session;

  constructor(private readonly authService: AuthentificationService) {
    this.authService.authChanges((_, session) => {
      this.session = session
    })
  }
}
