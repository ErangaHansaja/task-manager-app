import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { OnlineStatusService } from '../data/online-status.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private onlineStatus: OnlineStatusService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    // Allow access in local-only mode (offline or no account)
    if (!this.onlineStatus.isOnline) {
      return true;
    }

    // Allow access if user has a stored local session marker
    if (localStorage.getItem('localMode') === 'true') {
      return true;
    }

    // Standard JWT auth check
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
