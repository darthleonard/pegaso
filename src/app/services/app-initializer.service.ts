import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
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
      await this.storageService.init();

      const autoDownload = await this.storageService.get('autoDownload');
      if (autoDownload === null) {
        await this.storageService.save('autoDownload', 'never');
      }

      const online = await this.storageService.get('online');
      if (online === null) {
        await this.storageService.save('online', false);
      }

      if (autoDownload === 'always') {
        await this.connectivityService.switchOnlineMode(online);

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
