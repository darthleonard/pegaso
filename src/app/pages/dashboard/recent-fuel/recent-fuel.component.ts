import { Component, OnInit } from '@angular/core';
import { OfflineDataService } from 'src/app/services/offline-data.service';

@Component({
  selector: 'app-recent-fuel',
  templateUrl: './recent-fuel.component.html',
  styleUrls: ['./recent-fuel.component.scss'],
  standalone: false,
})
export class RecentFuelComponent implements OnInit {
  loading = true;
  error: string | null = null;
  recent: { total: number; fill_date: string } | null = null;
  updated = false;

  constructor(private readonly offlineDataService: OfflineDataService) {}

  ngOnInit() {
    this.load();
  }

  async load() {
    this.loading = true;
    this.error = null;
    try {
      const fuels: any[] = await this.offlineDataService.getAllRecords('fuel');
      if (fuels && fuels.length) {
        fuels.sort(
          (a, b) =>
            new Date(b.fill_date).getTime() - new Date(a.fill_date).getTime()
        );
        const recent = fuels[0];
        this.recent = {
          total: Number(recent.total || 0),
          fill_date: recent.fill_date,
        };
        // animate update
        this.updated = true;
        setTimeout(() => (this.updated = false), 600);
      } else {
        this.recent = null;
      }
    } catch (err) {
      console.error('Error loading recent fuel', err);
      this.error = 'Unable to load recent fuel';
      this.recent = null;
    } finally {
      this.loading = false;
    }
  }

  async refresh() {
    await this.load();
  }
}
