import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalstateService {
  private _apiUrl = '';
  private _apiKey = '';

  constructor() { }

  get apiUrl(): string {
    return this._apiUrl;
  }

  set apiUrl(value: string) {
    this._apiUrl = value ?? '';
  }

  get apiKey(): string {
    return this._apiKey;
  }

  set apiKey(value: string) {
    this._apiKey = value ?? '';
  }
}
