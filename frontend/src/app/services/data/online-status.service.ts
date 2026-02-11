import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineStatusService implements OnDestroy {
  private onlineStatus$ = new BehaviorSubject<boolean>(navigator.onLine);

  private onlineHandler = () => this.onlineStatus$.next(true);
  private offlineHandler = () => this.onlineStatus$.next(false);

  constructor() {
    window.addEventListener('online', this.onlineHandler);
    window.addEventListener('offline', this.offlineHandler);
  }

  get isOnline$() {
    return this.onlineStatus$.asObservable();
  }

  get isOnline(): boolean {
    return this.onlineStatus$.value;
  }

  ngOnDestroy(): void {
    window.removeEventListener('online', this.onlineHandler);
    window.removeEventListener('offline', this.offlineHandler);
  }
}
