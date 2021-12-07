import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-signin-callback",
  template: `<p>Processing signin callback</p>`,
  styles: [],
})
export class SigninCallbackComponent implements OnInit {
  constructor(private readonly _router: Router, private readonly _authService: AuthService) {}

  async ngOnInit() {
    await this._authService.userManager.signinCallback();
    this._router.navigate(['']);
  }
}
