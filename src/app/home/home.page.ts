import { Component } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { Bill } from './bill';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  constructor(private crudService: CrudService<Bill>) {}

  bills: any[] = [];

  ngOnInit() {
    this.loadBills();
  }

  async loadBills() {
    try {
      this.bills = await this.crudService.getAllAsync(
        `${environment.apiUrl}/bills`
      );
      console.log('Bills loaded:', this.bills);
    } catch (error) {
      console.error('Error loading bills:', error);
    }
  }

  async deleteBill(id: number) {
    try {
      await this.crudService.deleteAsync(`${environment.apiUrl}/bills`, id);
      this.loadBills(); // Reload the bills after deletion
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  }
}
