import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class OnlineDataService<T> {
  private static apiUrl: string;

  private readonly apiKey = 'MY_SECRET_API_KEY';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.apiKey}`,
  });

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService
  ) {
    this.storageService
      .get('api')
      .then((r) => OnlineDataService.updateApiUrl(r));
  }

  static updateApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async getAllAsync(endpoint: string): Promise<T[]> {
    try {
      return await lastValueFrom(this.getAll(endpoint));
    } catch (error) {
      console.error('Error loading data', error);
      throw error;
    }
  }

  async getByIdAsync(endpoint: string, id: string): Promise<T> {
    try {
      return await lastValueFrom(this.getById(endpoint, id));
    } catch (error) {
      console.error('Error loading data by ID', error);
      throw error;
    }
  }

  async createAsync(endpoint: string, item: T): Promise<T> {
    try {
      return await lastValueFrom(this.create(endpoint, item));
    } catch (error) {
      console.error('Error creating item', error);
      throw error;
    }
  }

  async updateAsync(endpoint: string, item: T): Promise<T> {
    try {
      return await lastValueFrom(this.update(endpoint, item));
    } catch (error) {
      console.error('Error updating item', error);
      throw error;
    }
  }

  async deleteAsync(endpoint: string, id: string): Promise<void> {
    try {
      await lastValueFrom(this.delete(endpoint, id));
    } catch (error) {
      console.error('Error deleting item', error);
      throw error;
    }
  }

  private create(endpoint: string, item: T): Observable<T> {
    return this.http.post<T>(`${OnlineDataService.apiUrl}/${endpoint}`, item, {
      headers: this.headers,
    });
  }

  private getAll(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${OnlineDataService.apiUrl}/${endpoint}`, {
      headers: this.headers,
    });
  }

  private getById(endpoint: string, id: string): Observable<T> {
    return this.http.get<T>(`${OnlineDataService.apiUrl}/${endpoint}/${id}`, {
      headers: this.headers,
    });
  }

  private update(endpoint: string, item: T): Observable<T> {
    return this.http.put<T>(`${OnlineDataService.apiUrl}/${endpoint}`, item, {
      headers: this.headers,
    });
  }

  private delete(endpoint: string, id: string): Observable<void> {
    return this.http.delete<void>(`${OnlineDataService.apiUrl}/${endpoint}`, {
      headers: this.headers,
      body: { id: id },
    });
  }
}
