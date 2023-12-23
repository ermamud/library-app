import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = request.headers;
    const token = this.authService.getToken();
    if (token) {
      headers = headers.append('Authorization', 'Bearer ' + token);
    }

    const newRequest = request.clone({
      headers,
      url: environment.apiBaseUrl + request.url,
    });

    return next.handle(newRequest);
  }
}
