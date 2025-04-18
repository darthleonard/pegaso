import { Injectable } from '@angular/core';
import { IBaseRecord } from '../base/ibase-record';
import { ChangeType } from '../base/change-type';
import { OfflineDataService } from './offline-data.service';
import { OnlineDataService } from './online.service';
import { ConnectivityService } from './connectivity.service';
import { ToastService } from './toast.service';
import { DataUtils } from '../utils/data-utils';

@Injectable()
export class DataService<T extends IBaseRecord> {
  private endpoint!: string;

  constructor(
    private readonly connectivityService: ConnectivityService,
    private readonly offlineDataService: OfflineDataService,
    private readonly onlineDataService: OnlineDataService<T>,
    private readonly toastService: ToastService
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
    record.id = DataUtils.generateUUID();
    if (this.connectivityService.isOnline()) {
      await this.onlineDataService.createAsync(this.endpoint, record);
    } else {
      record.changeType = ChangeType.New;
    }

    await this.offlineDataService.addRecord(this.endpoint, record);
  }

  async getAllRecords(refresh = false) {
    try {
      if (refresh || this.connectivityService.isOnline()) {
        await this.uploadUnsyncedRecords();
        const records = await this.onlineDataService.getAllAsync(this.endpoint);
        await this.offlineDataService.hardReload(this.endpoint, records);
        this.toastService.showSuccess({
          message: 'Local data refreshed',
        });
      }
    } catch (e) {
      this.toastService.showError({
        message: 'No internet access, try again later',
      });
    } finally {
      const records = await this.offlineDataService.getAllRecords(
        this.endpoint
      );
      return records.filter((r) => r.changeType !== ChangeType.Deleted);
    }
  }

  async getRecordById(id: string) {
    await this.offlineDataService.getRecordById(this.endpoint, id);
  }

  async updateRecord(id: string, updatedRecord: T) {
    if (this.connectivityService.isOnline()) {
      await this.onlineDataService.updateAsync(this.endpoint, updatedRecord);
    } else {
      if (!updatedRecord.changeType) {
        updatedRecord.changeType = ChangeType.Edited;
      }
    }

    await this.offlineDataService.updateRecord(
      this.endpoint,
      id,
      updatedRecord
    );
  }

  async deleteRecord(record: T) {
    if (!record.id) {
      return;
    }

    if (this.connectivityService.isOnline()) {
      try {
        await this.onlineDataService.deleteAsync(this.endpoint, record.id);
        await this.offlineDataService.deleteRecord(this.endpoint, record.id);
      } catch (error: any) {
        record.changeType = ChangeType.Deleted;
        await this.offlineDataService.updateRecord(
          this.endpoint,
          record.id,
          record
        );
        throw error;
      }
      return;
    }

    record.changeType = ChangeType.Deleted;
    await this.offlineDataService.updateRecord(
      this.endpoint,
      record.id,
      record
    );
  }

  private async uploadUnsyncedRecords() {
    const unsyncedRecords = (
      await this.offlineDataService.getAllRecords(this.endpoint)
    ).filter(
      (r) =>
        r.changeType === ChangeType.New ||
        r.changeType === ChangeType.Edited ||
        r.changeType === ChangeType.Deleted
    );

    for (const record of unsyncedRecords) {
      if (record.changeType === ChangeType.New) {
        await this.onlineDataService.createAsync(this.endpoint, record);
      }

      if (record.changeType === ChangeType.Edited) {
        await this.onlineDataService.updateAsync(this.endpoint, record);
      }

      if (record.changeType === ChangeType.Deleted) {
        await this.onlineDataService.deleteAsync(this.endpoint, record.id);
      }
    }
  }
}
