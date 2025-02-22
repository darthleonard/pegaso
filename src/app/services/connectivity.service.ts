import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {
  private online: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private onlineMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private networkService: NetworkService) { }

  online$ = this.online.asObservable();         // handle access to network
  onlineMode$ = this.onlineMode.asObservable(); // handle user preference to be online or offline

  isOnline() {
    return this.online.value;
  }

  async switchOnlineMode() {
    this.onlineMode.next(!this.onlineMode.value);
    await this.checkConnectivity();
  }

  async checkConnectivity() {
    const connectionStatus = await this.networkService.checkConnection();
    this.online.next(connectionStatus.connected && this.onlineMode.value);
  }
}
