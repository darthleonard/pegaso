import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NetworkService } from './network.service';
import { ConnectionType } from '@capacitor/network';

@Injectable({
  providedIn: 'root',
})
export class ConnectivityService {
  private online: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private onlineMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private networkService: NetworkService) {}

  online$ = this.online.asObservable();
  onlineMode$ = this.onlineMode.asObservable();

  connectionStatus = {
    connected: false,
    connectionType: 'unknown' as ConnectionType,
  };

  /**
   * Checks if the application can work online based on internet acces and user preferences.
   */
  isOnline() {
    return this.online.value;
  }

  async switchOnlineMode(enable?: boolean) {
    if (enable === undefined || enable !== this.onlineMode.value) {
      this.onlineMode.next(!this.onlineMode.value);
    } else {
      this.onlineMode.next(enable);
    }
    await this.checkConnectivity();
  }

  async checkConnectivity() {
    this.connectionStatus = await this.networkService.checkConnection();
    this.online.next(this.connectionStatus.connected && this.onlineMode.value);
  }
}
