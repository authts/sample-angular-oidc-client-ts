import { Component, OnInit } from "@angular/core";
import { User } from 'oidc-client-ts';
import { AuthService } from "../services/auth.service";
import { TestApiService } from '../services/test-api.service';

@Component({
  selector: "app-home",
  template: `
    <div style="text-align:center">
      <h1>
        Sample Angular Client
      </h1>
    </div>
    <div>
      <button (click)='onLogin()'>Login</button>
      <button (click)='onCallAPI()'>Call API</button>
      <button (click)='onRenewToken()'>Renew Token</button>
      <button (click)='onLogout()'>Logout</button>
    </div>
    <pre>{{currentUserJson}}</pre>
    <div>
      <h2>Messages</h2>
      <ul>
        <li *ngFor='let msg of messages'>{{msg}}</li>
      </ul>
    </div>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor(public authService: AuthService, public apiService: TestApiService) {
  }

  messages: string[] = [];
  get currentUserJson(): string {
    return JSON.stringify(this.currentUser, null, 2);
  }
  currentUser: User;

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

  clearMessages() {
    while (this.messages.length) {
      this.messages.pop();
    }
  }
  addMessage(msg: string) {
    this.messages.push(msg);
  }
  addError(msg: string | any) {
    this.messages.push('Error: ' + msg && msg.message);
  }

  public onLogin() {
    this.clearMessages();
    this.authService.login().catch(err => {
      this.addError(err);
    });
  }

  public onCallAPI() {
    this.clearMessages();
    this.apiService.callApi().then(result => {
      this.addMessage('API Result: ' + JSON.stringify(result));
    }, err => this.addError(err));
  }

  public onRenewToken() {
    this.clearMessages();
    this.authService.renewToken()
      .then(user => {
        this.currentUser = user;
        this.addMessage('Silent Renew Success');
      })
      .catch(err => this.addError(err));
  }

  public onLogout() {
    this.clearMessages();
    this.authService.logout().catch(err => this.addError(err));
  }

  public refresh() : void {
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
