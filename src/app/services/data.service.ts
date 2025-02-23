import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OfflineDataService } from './offline-data.service';
import { CrudService } from './crud.service';
import { IBaseRecord } from '../base/ibase-record';
import { ConnectivityService } from './connectivity.service';

@Injectable()
export class DataService<T extends IBaseRecord> {
  private endpoint!: string;
  constructor(
    private readonly connectivityService: ConnectivityService,
    private readonly offlineDataService: OfflineDataService,
    private readonly crudService: CrudService<T>
  ) {}

  init(endpoint: string) {
    this.endpoint = endpoint;
  }

  async saveRecord(record: T) {
    if (record.id) {
      await this.updateRecord(record.id, record);
    } else {
      await this.addRecord(record);
    }
  }

  async addRecord(record: T) {
    record.id = this.generateUUID();
    if (this.connectivityService.isOnline()) {
      await this.crudService.createAsync(`${environment.apiUrl}/${this.endpoint}`, record);
    }
    
    await this.offlineDataService.addRecord(this.endpoint, record);
  }

  async getAllRecords(refresh = false) {
    if(refresh && this.connectivityService.isOnline()) {
      const records = await this.crudService.getAllAsync(`${environment.apiUrl}/${this.endpoint}`);
      await this.offlineDataService.hardReload(this.endpoint, records);
    }
    return await this.offlineDataService.getAllRecords(this.endpoint);
  }

  async getRecordById(id: string) {
    await this.offlineDataService.getRecordById(this.endpoint, id);
  }

  async updateRecord(id: string, updatedRecord: T) {
    if (this.connectivityService.isOnline()) {
      await this.crudService.updateAsync(
        `${environment.apiUrl}/${this.endpoint}`,
        updatedRecord
      );
    }

    await this.offlineDataService.updateRecord(
      this.endpoint,
      id,
      updatedRecord
    );
  }

  async deleteRecord(id: string) {
    await this.offlineDataService.deleteRecord(this.endpoint, id);
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
