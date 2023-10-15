import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TUI_PASSWORD_TEXTS, TUI_VALIDATION_ERRORS, tuiInputPasswordOptionsProvider} from "@taiga-ui/kit";
import {of} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "../authentification.service";
// import {AuthRepository, authStore, authStore as AuthStore} from "../auth-store";
import {AuthStoreService} from "../auth-store.service";
import {Router} from "@angular/router";

@Component({
  selector: 'polity-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
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
export class RegisterComponent {
  loading: boolean = false;
  registerForm = new FormGroup({
    email: new FormControl('email', [Validators.required, Validators.email]),
    password: new FormControl('password', [Validators.required, Validators.minLength(6)]),
  })

  constructor(
      private readonly supabase: AuthentificationService,
      public authRepository: AuthStoreService,
      private router: Router
  ) {}

  async onSubmit() {
    try {
      this.loading = true;
      const {error} = await this.supabase.signUp({
        email: this.registerForm.value.email as string,
        password: this.registerForm.value.password as string
      })
      if (error) {
        throw error
      }
      this.router.navigate(['/login'])
    } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
    } finally {
      this.registerForm.reset();
      this.loading = false;
    }
  }
}
