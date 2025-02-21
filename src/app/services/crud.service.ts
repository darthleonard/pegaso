import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService<T> {
  constructor(private http: HttpClient) {}

  create(url: string, item: T): Observable<T> {
    return this.http.post<T>(url, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  getAll(url: string): Observable<T[]> {
    return this.http.get<T[]>(url);
  }

  getById(url: string, id: number): Observable<T> {
    return this.http.get<T>(`${url}/${id}`);
  }

  update(url: string, item: T): Observable<T> {
    return this.http.put<T>(`${url}`, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  delete(url: string, id: number): Observable<void> {
    return this.http.delete<void>(`${url}/${id}`);
  }

  async getAllAsync(url: string): Promise<T[]> {
    try {
      return await lastValueFrom(this.getAll(url));
    } catch (error) {
      console.error('Error loading data', error);
      throw error;
    }
  }

  async getByIdAsync(url: string, id: number): Promise<T> {
    try {
      return await lastValueFrom(this.getById(url, id));
    } catch (error) {
      console.error('Error loading data by ID', error);
      throw error;
    }
  }

  async createAsync(url: string, item: T): Promise<T> {
    try {
      return await lastValueFrom(this.create(url, item));
    } catch (error) {
      console.error('Error creating item', error);
      throw error;
    }
  }

  async updateAsync(url: string, item: T): Promise<T> {
    try {
      return await lastValueFrom(this.update(url, item));
    } catch (error) {
      console.error('Error updating item', error);
      throw error;
    }
  }

  async deleteAsync(url: string, id: number): Promise<void> {
    try {
      await lastValueFrom(this.delete(url, id));
    } catch (error) {
      console.error('Error deleting item', error);
      throw error;
    }
  }
}
