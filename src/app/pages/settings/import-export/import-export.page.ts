import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ToastService } from 'src/app/services/toast.service';
import { DatabaseExportService } from 'src/app/services/database-export.service';
import { DatabaseImportService } from 'src/app/services/database-import.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.page.html',
  standalone: false,
})
export class ImportExportPage {
  constructor(
    private readonly alertService: AlertService,
    private readonly toastService: ToastService,
    private readonly exportService: DatabaseExportService,
    private readonly importService: DatabaseImportService
  ) {}

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
}
