import { Component } from '@angular/core';
import { isEqual } from 'lodash';
import { AlertService } from 'src/app/services/alert.service';
import { ConnectivityService } from 'src/app/services/connectivity.service';
import { GlobalstateService } from 'src/app/services/global-state.service';
import { StorageKeys, StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { DatabaseExportService } from 'src/app/services/database-export.service';
import { DatabaseImportService } from 'src/app/services/database-import.service';
import { Capacitor } from '@capacitor/core';

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
    private readonly toastService: ToastService,
    private readonly exportService: DatabaseExportService,
    private readonly importService: DatabaseImportService
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

  // Export current DB as CSV and trigger download
  async onExportDatabase() {
    try {
      const result = await this.exportService.exportDatabaseCSV();
      if (result && result.platform === 'native') {
        this.toastService.showSuccess({
          message: `Database saved to ${result.directory || ''}/${result.path}`,
        });
      } else {
        this.toastService.showSuccess({ message: 'Database exported' });
      }
    } catch (err) {
      console.error('Export failed', err);
      this.toastService.showError({ message: `Export failed: ${err}` });
    }
  }

  // Trigger the hidden file input
  triggerImportFilePicker() {
    // If running on web, trigger file input. On native, ask for filename in Documents.
    const platform = Capacitor.getPlatform ? Capacitor.getPlatform() : 'web';
    if (platform === 'web') {
      const input = document.querySelector(
        'input[type=file]'
      ) as HTMLInputElement | null;
      if (input) {
        input.value = '';
        input.click();
      } else {
        this.toastService.showError({ message: 'File input not found' });
      }
    } else {
      // Native flow: ask user for filename located in Documents directory
      const filename = window.prompt(
        'Enter filename to import (in app Documents, e.g. pegasus_database.csv):'
      );
      if (!filename) return;
      this.onImportNativeFilename(filename);
    }
  }

  // File selected handler
  async onFileSelected(evt: Event) {
    const input = evt.target as HTMLInputElement;
    if (!input || !input.files || input.files.length === 0) return;
    const file = input.files[0];

    const confirm = await this.alertService.presentAlert({
      header: 'Import database',
      message: 'This will replace local data. Do you want to continue?',
    });
    if (!confirm) return;

    try {
      await this.importService.importDatabaseFromCSV({ file });
      this.toastService.showSuccess({
        message: 'Database imported successfully',
      });
    } catch (err) {
      console.error('Import error', err);
      this.toastService.showError({
        message: 'Import failed. Previous data was restored.',
      });
      await this.alertService.presentAlert({
        header: 'Import failed',
        message: `${err}`,
      });
    }
  }

  private async onImportNativeFilename(filename: string) {
    const confirm = await this.alertService.presentAlert({
      header: 'Import database',
      message: `This will replace local data with contents of ${filename} (app Documents). Do you want to continue?`,
    });
    if (!confirm) return;

    try {
      await this.importService.importDatabaseFromCSV({
        nativeFilename: filename,
      });
      this.toastService.showSuccess({
        message: 'Database imported successfully',
      });
    } catch (err) {
      console.error('Native import error', err);
      this.toastService.showError({
        message: 'Import failed. Previous data was restored.',
      });
      await this.alertService.presentAlert({
        header: 'Import failed',
        message: `${err}`,
      });
    }
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
