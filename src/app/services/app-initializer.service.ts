import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ConnectivityService } from './connectivity.service';
import { DownloadService } from './download.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor(
    private readonly storageService: StorageService,
    private readonly connectivityService: ConnectivityService,
    private readonly downloadService: DownloadService
  ) {}

  async initialize(
    loading: HTMLIonLoadingElement,
    setLoaded: (value: boolean) => void
  ) {
    try {
      await loading.present();

      const apiUrl = await this.storageService.get('api');
      if (apiUrl === null) {
        await this.storageService.save('api', '');
      }

      const autoDownload = await this.storageService.get('autoDownload');
      if (autoDownload === null) {
        await this.storageService.save('autoDownload', 'never');
      }

      let online = await this.storageService.get('online');
      if (online === null) {
        online = false;
        await this.storageService.save('online', online);
      }
      await this.connectivityService.switchOnlineMode(online);

      if (autoDownload === 'always') {
        if (online && this.connectivityService.isOnline()) {
          this.updateLoadingMessage(loading, 'Downloading data...');
          await this.downloadService.download();
        }
      }

      setLoaded(true);
    } catch (error) {
      console.error('Error during initialization:', error);
      // TODO: display message to visit settings page
    } finally {
      loading.dismiss();
    }
  }

  updateLoadingMessage(loading: HTMLIonLoadingElement, newMessage: string) {
    loading.message = newMessage;
  }
}
