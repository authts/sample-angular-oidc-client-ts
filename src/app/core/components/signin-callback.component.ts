import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin-callback',
  template: `<p>Processing signin callback</p>`,
  styles: '',
  standalone: true,
  imports: [],
})
export class SigninCallbackComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  ngOnInit() {
    this.authService.userManager.signinCallback().finally(() => {
      this.router.navigate(['']);
    });
  }
}
