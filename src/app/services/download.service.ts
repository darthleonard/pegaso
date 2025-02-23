import { Injectable } from '@angular/core';
import { localDatabase } from '../database/local-database';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  private downloadFinished: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) {}

  downloadFinished$ = this.downloadFinished.asObservable();

  async download() {
    console.log('Downloading data...');
    for (const table of localDatabase.tables) {
      console.log('Downloading ', table.name);
      const records = await lastValueFrom(
        this.http.get<any[]>(`${environment.apiUrl}/${table.name}`)
      );
      await localDatabase.table(table.name).clear();
      await localDatabase.table(table.name).bulkPut(records);
    }
    console.log('Download finished');
    this.downloadFinished.next(true);
  }
}
