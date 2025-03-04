import { Injectable } from '@angular/core';
import { localDatabase } from '../database/local-database';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  private downloadFinished: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private apiUrl!: string;

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
    private readonly toastService: ToastService
  ) {
    this.storageService.get('api').then((r) => this.updateApiUrl(r));
  }

  downloadFinished$ = this.downloadFinished.asObservable();

  updateApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async download() {
    if (!this.apiUrl.length) {
      this.toastService.showError({
        message: 'Download failed, API is not configured',
      });
      return;
    }
    console.log('Downloading data...');
    for (const table of localDatabase.tables) {
      console.log('Downloading ', table.name);
      const records = await lastValueFrom(
        this.http.get<any[]>(`${this.apiUrl}/${table.name}`)
      );
      await localDatabase.table(table.name).clear();
      await localDatabase.table(table.name).bulkPut(records);
    }
    console.log('Download finished');
    this.downloadFinished.next(true);
  }
}
