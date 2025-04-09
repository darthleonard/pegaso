import { Component } from '@angular/core';
import { isEqual } from 'lodash';
import { AlertService } from 'src/app/services/alert.service';
import { ConnectivityService } from 'src/app/services/connectivity.service';
import { GlobalstateService } from 'src/app/services/global-state.service';
import { StorageKeys, StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  standalone: false,
})
export class SettingsPage {
  private originalConfig = {};

  constructor(
    private readonly storageService: StorageService,
    private readonly globalStateService: GlobalstateService,
    private readonly connectivityService: ConnectivityService,
    private readonly alertService: AlertService,
    private readonly toastService: ToastService
  ) {}

  loading = false;
  config = {
    apiUrl: '',
    apiKey: '',
    online: false,
    autoDownload: 'never',
    downloadInterval: 0,
  };

  ionViewWillEnter() {
    this.loading = true;
    this.loadSettings().finally(() => (this.loading = false));
  }

  hasChanges(): boolean {
    return !isEqual(this.originalConfig, this.config);
  }

  showUnsavedChangesAlert(): Promise<boolean> {
    return this.alertService.presentAlert({
      header: 'You have unsaved changes',
      message: 'Do you want to discard changes?',
    });
  }

  async onSave() {
    if (this.config.online && !this.config.apiUrl.length) {
      this.toastService.showError({
        message: 'API cannot be empty if online mode is active',
      });
      return;
    }

    if (
      this.config.apiUrl.length > 0 &&
      (!this.config.apiKey || this.config.apiKey.length === 0)
    ) {
      this.toastService.showError({
        message: 'If there is a API URL, API Key cannot be empty',
      });
      return;
    }

    await this.storageService.save(StorageKeys.API, this.config.apiUrl);
    await this.storageService.save(StorageKeys.API_KEY, this.config.apiKey);
    await this.storageService.save(StorageKeys.ONLINE, this.config.online);
    await this.storageService.save(
      StorageKeys.AUTO_DOWNLOAD,
      this.config.autoDownload
    );
    await this.storageService.save(
      StorageKeys.DOWNLOAD_INTERVAL,
      this.config.downloadInterval
    );

    this.globalStateService.apiUrl = this.config.apiUrl;
    this.globalStateService.apiKey = this.config.apiKey;

    await this.connectivityService.switchOnlineMode(this.config.online);
    this.originalConfig = { ...this.config };
    this.toastService.showSuccess({ message: 'Settings saved' });
  }

  private async loadSettings() {
    this.config.apiKey = await this.storageService.get(StorageKeys.API_KEY);
    this.config.apiUrl = await this.storageService.get(StorageKeys.API);
    this.config.online = await this.storageService.get(StorageKeys.ONLINE);
    this.config.downloadInterval = await this.storageService.get(
      StorageKeys.DOWNLOAD_INTERVAL
    );
    this.config.autoDownload = await this.storageService.get(
      StorageKeys.AUTO_DOWNLOAD
    );
    this.originalConfig = { ...this.config };
  }
}
