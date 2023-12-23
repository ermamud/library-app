import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuth$: Observable<boolean>;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuth$ = this.authService.isAuth;
  }

  logout(event: MouseEvent): void {
    this.authService.logout();

    if (event) {
      event.preventDefault();
    }
  }
}
