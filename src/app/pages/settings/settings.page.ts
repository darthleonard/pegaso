import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConnectivityService } from 'src/app/services/connectivity.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  standalone: false,
})
export class SettingsPage implements OnInit {
  constructor(
    private readonly storageService: StorageService,
    private readonly connectivityService: ConnectivityService
  ) {
    this.storageService.init();
  }

  config = {
    apiUrl: '',
    online: false,
    autoDownload: 'never',
    downloadInterval: 0
  };

  ngOnInit() {
    this.storageService.get("api").then(r => this.config.apiUrl = r ?? environment.apiUrl);
    this.storageService.get("online").then(r => {
      this.config.online = r ?? false;
      this.connectivityService.switchOnlineMode(this.config.online);
    });
    this.storageService.get("downloadInterval").then(r => this.config.downloadInterval = r ?? 0);
    this.storageService.get("autoDownload").then(r => this.config.autoDownload = r ?? 'never');
  }

  async onSave() {
    await this.storageService.save("api", this.config.apiUrl);
    await this.storageService.save("online", this.config.online);
    await this.storageService.save("autoDownload", this.config.autoDownload);
    await this.storageService.save("downloadInterval", this.config.downloadInterval);

    this.connectivityService.switchOnlineMode(this.config.online);
  }
}
