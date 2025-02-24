import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private readonly storage: Storage) { }

  async init() {
    await this.storage.create();
  }

  async save(key: string, value: any) {
    await this.storage.set(key, value);
  }

  async get(key: string) {
    return await this.storage.get(key);
  }

  async remove(key: string) {
    await this.storage.remove(key);
  }
}
