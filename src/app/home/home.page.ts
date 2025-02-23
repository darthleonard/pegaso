import { Component } from '@angular/core';
import { OnlineDataService } from '../services/online.service';
import { Bill } from '../pages/bills/bill';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  constructor(private crudService: OnlineDataService<Bill>) {}

  bills?: Bill[];

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
      this.loadBills();
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  }
}
