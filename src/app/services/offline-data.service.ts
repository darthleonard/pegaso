import { Injectable } from '@angular/core';
import { localDatabase } from '../database/local-database';

@Injectable({
  providedIn: 'root',
})
export class OfflineDataService {
  async addRecord(storeName: string, record: any) {
    if (!record.hasOwnProperty('id') || record.id === null) {
      record.id = undefined;
    }
    try {
      const id = await localDatabase.table(storeName).add(record);
      console.log(`Record added to ${storeName}:`, id);
      return id;
    } catch (err) {
      console.error(`Error adding record to ${storeName}:`, err);
      return 0;
    }
  }

  async getAllRecords(storeName: string) {
    try {
      const records = await localDatabase.table(storeName).toArray();
      return records;
    } catch (err) {
      console.error(`Error getting records from ${storeName}:`, err);
      return [];
    }
  }

  async getRecordById(storeName: string, id: string) {
    try {
      const record = await localDatabase.table(storeName).get(id);
      return record;
    } catch (err) {
      console.error(`Error getting record by ID from ${storeName}:`, err);
      return null;
    }
  }

  async updateRecord(storeName: string, id: string, updatedRecord: any) {
    try {
      const success = await localDatabase
        .table(storeName)
        .update(id, updatedRecord);
      if (success) {
        console.log(`Record updated in ${storeName}:`, success);
        return success;
      } else {
        console.error(`No record found with ID ${id} in ${storeName}`);
        return null;
      }
    } catch (err) {
      console.error(`Error updating record in ${storeName}:`, err);
      return null;
    }
  }

  async deleteRecord(storeName: string, id: string) {
    try {
      await localDatabase.table(storeName).delete(id);
      console.log(`Record deleted from ${storeName} with ID: ${id}`);
    } catch (err) {
      console.error(`Error deleting record from ${storeName}:`, err);
    }
  }
}
