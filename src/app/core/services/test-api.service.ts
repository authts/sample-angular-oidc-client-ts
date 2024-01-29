import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export type TestApiResponse = { type: string; value: string }[];

@Injectable({
  providedIn: 'root',
})
export class TestApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly authService = inject(AuthService);

  callApi(): Promise<TestApiResponse> {
    return this.authService.getUser().then((user) => {
      if (user?.access_token) {
        return this.makeApiRequest(user.access_token);
      } else if (user) {
        return this.authService.renewToken().then((user) => {
          return this.makeApiRequest(user!.access_token);
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }

  private makeApiRequest(token: string): Promise<TestApiResponse> {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    });

    return firstValueFrom(
      this.httpClient.get<TestApiResponse>(`${environment.apiRoot}/test`, {
        headers,
      })
    ).catch((result: HttpErrorResponse) => {
      if (result.status === 401) {
        return this.authService.renewToken().then(() => {
          return this.callApi();
        });
      }
      throw result;
    });
  }
}
