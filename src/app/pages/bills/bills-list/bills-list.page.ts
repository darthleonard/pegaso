import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';
import { Bill } from '../bill';

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
    private readonly toastService: ToastService,
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
      this.toastService.showError({ message: `Error loading bills ${error}` });
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
}
