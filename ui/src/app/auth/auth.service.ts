import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export const LOCAL_STORAGE_KEYS = {
  token: 'access_token',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuth$ = new BehaviorSubject<boolean>(!!this.getToken());
  isAuth = this._isAuth$.asObservable();

  constructor(private httpClient: HttpClient) {
    this.isAuth.subscribe((isAuth) => {
      console.log('ernesto isAuth', isAuth);
    });
  }

  login(
    username: string,
    password: string
  ): Observable<{ access_token: string }> {
    return this.httpClient.post<{ access_token: string }>('auth/login', {
      username,
      password,
    });
  }

  getToken(): string {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.token);
  }

  storeToken(token: string): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.token, token);
    this._isAuth$.next(true);
  }

  logout(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
    this._isAuth$.next(false);
  }
}
