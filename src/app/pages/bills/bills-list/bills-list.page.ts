import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Bill } from '../bill';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bills-list',
  templateUrl: './bills-list.page.html',
  styleUrls: ['./bills-list.page.css'],
  standalone: false,
})
export class BillsListPage implements OnInit {
  constructor(private crudService: CrudService<Bill>) {}

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
