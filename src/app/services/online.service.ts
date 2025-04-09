import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { GlobalstateService } from './global-state.service';

@Injectable({
  providedIn: 'root',
})
export class OnlineDataService<T> {
  constructor(
    private readonly http: HttpClient,
    private readonly globalstateService: GlobalstateService
  ) { }

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
    return this.http.post<T>(`${this.globalstateService.apiUrl}/${endpoint}`, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.globalstateService.apiKey}`,
      }),
    });
  }

  private getAll(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.globalstateService.apiUrl}/${endpoint}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.globalstateService.apiKey}`,
      }),
    });
  }

  private getById(endpoint: string, id: string): Observable<T> {
    return this.http.get<T>(`${this.globalstateService.apiUrl}/${endpoint}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.globalstateService.apiKey}`,
      }),
    });
  }

  private update(endpoint: string, item: T): Observable<T> {
    return this.http.put<T>(`${this.globalstateService.apiUrl}/${endpoint}`, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.globalstateService.apiKey}`,
      }),
    });
  }

  private delete(endpoint: string, id: string): Observable<void> {
    return this.http.delete<void>(`${this.globalstateService.apiUrl}/${endpoint}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.globalstateService.apiKey}`,
      }),
      body: { id: id },
    });
  }
}
