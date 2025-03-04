import { Component, OnInit } from '@angular/core';
import { ConnectivityService } from 'src/app/services/connectivity.service';
import { DownloadService } from 'src/app/services/download.service';
import { OnlineDataService } from 'src/app/services/online.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  standalone: false,
})
export class SettingsPage implements OnInit {
  constructor(
    private readonly storageService: StorageService,
    private readonly downloadService: DownloadService,
    private readonly connectivityService: ConnectivityService,
    private readonly toastService: ToastService
  ) { }

  config = {
    apiUrl: '',
    online: false,
    autoDownload: 'never',
    downloadInterval: 0
  };

  ngOnInit() {
    this.storageService.get("api").then(r => this.config.apiUrl = r);
    this.storageService.get("online").then(r => this.config.online = r);
    this.storageService.get("downloadInterval").then(r => this.config.downloadInterval = r ?? 0);
    this.storageService.get("autoDownload").then(r => this.config.autoDownload = r);
  }

  async onSave() {
    if(this.config.online && !this.config.apiUrl.length) {
      this.toastService.showError({ message: 'API cannot be empty if online mode is active' });
      return;
    }
    await this.storageService.save("api", this.config.apiUrl);
    await this.storageService.save("online", this.config.online);
    await this.storageService.save("autoDownload", this.config.autoDownload);
    await this.storageService.save("downloadInterval", this.config.downloadInterval);

    this.downloadService.updateApiUrl(this.config.apiUrl);
    OnlineDataService.updateApiUrl(this.config.apiUrl);

    await this.connectivityService.switchOnlineMode(this.config.online);
  }
}
