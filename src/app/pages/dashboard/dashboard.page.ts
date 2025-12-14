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

  recentFuel: { total: number; fill_date: string } | null = null;

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
      // Fuel: most recent fill
      const fuels: any[] = await this.offlineDataService.getAllRecords('fuel');
      if (fuels && fuels.length) {
        fuels.sort(
          (a, b) =>
            new Date(b.fill_date).getTime() - new Date(a.fill_date).getTime()
        );
        const recent = fuels[0];
        this.recentFuel = {
          total: Number(recent.total || 0),
          fill_date: recent.fill_date,
        };
      } else {
        this.recentFuel = null;
      }

      // Top 10 products by occurrences in shoppingItems
      const items: any[] = await this.offlineDataService.getAllRecords(
        'shoppingItems'
      );
      const counts: Record<string, number> = {};
      for (const it of items) {
        const name = (it.item_name || it.item || '').toString().trim();
        if (!name) continue;
        counts[name] = (counts[name] || 0) + 1;
      }
      const products = Object.keys(counts).map((k) => ({
        name: k,
        count: counts[k],
      }));
      products.sort((a, b) => b.count - a.count);
      this.topProducts = products.slice(0, 10);
    } catch (err) {
      console.error('Error loading dashboard KPIs', err);
      this.toastService.showError({ message: 'Error loading dashboard data' });
    } finally {
      this.loading = false;
    }
  }
}
