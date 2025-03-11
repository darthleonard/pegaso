import { Injectable } from '@angular/core';
import { localDatabase } from '../database/local-database';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';
import { GlobalstateService } from './global-state.service';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  private downloadFinished: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  
  constructor(
    private readonly http: HttpClient,
    private readonly toastService: ToastService,
    private readonly globalStateService: GlobalstateService
  ) { }

  downloadFinished$ = this.downloadFinished.asObservable();

  async download() {
    if (!this.globalStateService.apiUrl.length) {
      this.toastService.showError({
        message: 'Download failed, API is not configured',
      });
      return;
    }
    console.log('Downloading data...');
    for (const table of localDatabase.tables) {
      console.log('Downloading ', table.name);
      const records = await lastValueFrom(
        this.http.get<any[]>(`${this.globalStateService.apiUrl}/${table.name}`, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.globalStateService.apiKey}`,
          }),
        })
      );
      await localDatabase.table(table.name).clear();
      await localDatabase.table(table.name).bulkPut(records);
    }
    console.log('Download finished');
    this.downloadFinished.next(true);
  }
}
