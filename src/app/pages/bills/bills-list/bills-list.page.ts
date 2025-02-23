import { Component, OnInit } from '@angular/core';
import { Bill } from '../bill';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-bills-list',
  templateUrl: './bills-list.page.html',
  styleUrls: ['./bills-list.page.css'],
  providers: [DataService],
  standalone: false,
})
export class BillsListPage {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly dataService: DataService<Bill>
  ) {
    this.dataService.init('bills');
  }

  bills?: Bill[] | null;

  ionViewWillEnter() {
    this.loadBills();
  }

  async handleRefresh(event: CustomEvent) {
    this.bills = null;
    await this.loadBills(true);
    (event.target as HTMLIonRefresherElement).complete();
  }

  async loadBills(refresh = false) {
    try {
      this.bills = await this.dataService.getAllRecords(refresh);
    } catch (error) {
      console.error('Error loading bills:', error);
    }
  }

  async onCreateClick() {
    this.router.navigate(['/bills/bills-form'], {
      relativeTo: this.route,
    });
  }

  async onClick(bill: Bill) {
    this.router.navigate(['/bills/bills-form'], {
      relativeTo: this.route,
      state: {
        bill: bill,
      },
    });
  }

  async deleteBill(id: string) {
    try {
      await this.dataService.deleteRecord(id);
      this.loadBills();
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  }
}
