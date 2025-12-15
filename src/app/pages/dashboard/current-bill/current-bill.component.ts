import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfflineDataService } from 'src/app/services/offline-data.service';

@Component({
  selector: 'app-current-bill',
  templateUrl: './current-bill.component.html',
  styleUrls: ['./current-bill.component.scss'],
  standalone: false,
})
export class CurrentBillComponent implements OnInit {
  bill: any;
  loading = true;
  error: string | null = null;
  updated = false;

  constructor(
    private readonly offlineDataService: OfflineDataService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  async load() {
    this.loading = true;
    this.error = null;
    try {
      const bills: any[] = await this.offlineDataService.getAllRecords('bills');
      this.bill = bills && bills.length ? bills[0] : null;
      // trigger visual update animation
      this.updated = true;
      setTimeout(() => (this.updated = false), 600);
    } catch (err) {
      this.error = 'Unable to load current bill';
      this.bill = null;
    } finally {
      this.loading = false;
    }
  }

  async refresh() {
    await this.load();
  }

  onClick() {
    this.router.navigate(['/bills']);
  }
}
