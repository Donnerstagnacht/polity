import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TUI_PASSWORD_TEXTS, TUI_VALIDATION_ERRORS, tuiInputPasswordOptionsProvider} from "@taiga-ui/kit";
import {of} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'polity-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
      tuiInputPasswordOptionsProvider({
        icons: {
            hide: 'tuiIconLockLarge',
            show: 'tuiIconUnlockLarge'
        },
      }),
      {
          provide: TUI_PASSWORD_TEXTS,
          useValue: of([''])
      },
      {
          provide: TUI_VALIDATION_ERRORS,
          useValue: {
              required: 'Bitte ausfüllen.',
              email: 'Bitte eine gültige E-Mail-Adresse eingeben.',
              minlength: ({requiredLength}: {requiredLength: string}) =>
                  of(`Passwort benötigt mindestens ${requiredLength} Zeichen.`)
          }
      }
  ]
})
export class LoginComponent {
    loginForm = new FormGroup({
        email: new FormControl('email', [Validators.required, Validators.email]),
        password: new FormControl('password', [Validators.required, Validators.minLength(6)]),
    })

    constructor(private router: Router) {    }

    onSubmit() {
        console.log(this.loginForm.value);
        this.router.navigate(['/profile']);
    }
}
