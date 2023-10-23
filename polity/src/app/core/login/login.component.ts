import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TUI_PASSWORD_TEXTS, TUI_VALIDATION_ERRORS, tuiInputPasswordOptionsProvider} from "@taiga-ui/kit";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {AuthentificationService} from "../authentification.service";

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
  loading: boolean = false;
  loginForm = new FormGroup({
      email: new FormControl('test1@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('010893', [Validators.required, Validators.minLength(6)]),
  })

    constructor(
      private router: Router,
      private authService: AuthentificationService,
    ) {    }

    async onSubmit() {
      try {
        this.loading = true;
        const email = this.loginForm.value.email as string;
        const password = this.loginForm.value.password as string;
        const {error} = await this.authService.signIn({
          email,
          password
        })
        if (error) {
          throw error
        }
        this.router.navigate(['/profile']);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        this.loginForm.reset();
        this.loading = false;
      }
    }

    async signOut() {
      console.log('signout')
        try {
          const {error} = await this.authService.signOut();
          if (error) {
            throw error
          }
          this.router.navigate(['/login']);
        } catch (error) {
          if (error instanceof Error) {
            alert(error.message)
          }
        }
    }
}
