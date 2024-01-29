import { Component, OnInit, inject } from '@angular/core';
import { User } from 'oidc-client-ts';
import { AuthService } from '../services/auth.service';
import { TestApiService } from '../services/test-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <div style="text-align:center">
      <h1>Sample Angular Client</h1>
    </div>
    <div>
      <button (click)="onLogin()">Login</button>
      <button (click)="onCallAPI()">Call API</button>
      <button (click)="onRenewToken()">Renew Token</button>
      <button (click)="onLogout()">Logout</button>
    </div>
    <pre>{{ currentUserJson }}</pre>
    <div>
      <h2>Messages</h2>
      <ul>
        @for (msg of messages; track msg) {
          <li>{{ msg }}</li>
        }
      </ul>
    </div>
  `,
  styles: '',
})
export class HomeComponent implements OnInit {
  readonly authService = inject(AuthService);
  readonly apiService = inject(TestApiService);

  messages: string[] = [];

  currentUser: User | null = null;
  get currentUserJson(): string {
    return JSON.stringify(this.currentUser, null, 2);
  }

  ngOnInit(): void {
    this.authService.getUser().then(user => {
      this.currentUser = user;

      if (user) {
        this.addMessage('User Logged In');
      } else {
        this.addMessage('User Not Logged In');
      }
    }).catch(err => this.addError(err));
  }

  private clearMessages() {
    while (this.messages.length) {
      this.messages.pop();
    }
  }
  private addMessage(msg: string) {
    this.messages.push(msg);
  }
  private addError(msg: string | Error) {
    this.messages.push('Error: ' + (msg instanceof Error ? msg.message : msg));
  }

  onLogin() {
    this.clearMessages();
    this.authService.login().catch(err => {
      this.addError(err);
    });
  }

  onCallAPI() {
    this.clearMessages();
    this.apiService.callApi().then(result => {
      this.addMessage('API Result: ' + JSON.stringify(result));
    }, err => this.addError(err));
  }

  onRenewToken() {
    this.clearMessages();
    this.authService.renewToken()
      .then(user => {
        this.currentUser = user;
        this.addMessage('Silent Renew Success');
      })
      .catch(err => this.addError(err));
  }

  onLogout() {
    this.clearMessages();
    this.authService.logout().catch(err => this.addError(err));
  }

  refresh(): void {
    console.warn('AppComponent.refresh');
    this.authService.getUser().then(user => {
      this.currentUser = user;

      if (user) {
        this.addMessage('User Logged In');
      } else {
        this.addMessage('User Not Logged In');
      }
    }).catch(err => this.addError(err));
  }
}
