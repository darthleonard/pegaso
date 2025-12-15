import { Component } from '@angular/core';
import { OfflineDataService } from 'src/app/services/offline-data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage {
  bill: any;
  houseTotal = 0;
  houseCount = 0;

  topProducts: Array<{ name: string; count: number }> = [];

  loading = false;

  constructor(
    private readonly offlineDataService: OfflineDataService,
    private readonly toastService: ToastService
  ) {}

  ionViewWillEnter() {
    this.loadKpis();
  }

  private async loadKpis() {
    this.loading = true;
    try {
      // Recent fuel card moved to its own component `app-recent-fuel`.
    } catch (err) {
      console.error('Error loading dashboard KPIs', err);
      this.toastService.showError({ message: 'Error loading dashboard data' });
    } finally {
      this.loading = false;
    }
  }
}
