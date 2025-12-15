import { Component, OnInit } from '@angular/core';
import { OfflineDataService } from 'src/app/services/offline-data.service';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss'],
  standalone: false,
})
export class TopProductsComponent implements OnInit {
  loading = true;
  error: string | null = null;
  updated = false;

  products: Array<{
    name: string;
    total: number;
    occurrences: number;
    avgQty: number;
    avgUnitPrice: number;
  }> = [];

  constructor(private readonly offlineDataService: OfflineDataService) {}

  ngOnInit() {
    this.load();
  }

  async load() {
    this.loading = true;
    this.error = null;

    try {
      const lists: any[] = await this.offlineDataService.getAllRecords(
        'shoppingLists'
      );

      // Advanced normalization helpers
      const normalizeKey = (s: string) => {
        if (!s) return '';
        // remove diacritics
        let n = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        // remove punctuation, keep letters/numbers and spaces
        n = n.replace(/[^\p{L}\p{N}\s]/gu, '');
        // collapse whitespace and lowercase
        n = n.replace(/\s+/g, ' ').trim().toLowerCase();
        return n;
      };

      const titleCase = (s: string) => {
        if (!s) return s;
        return s
          .toLowerCase()
          .split(/\s+/)
          .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
          .join(' ');
      };

      type Entry = {
        totalQty: number;
        occurrences: number;
        totalPriceQty: number;
        displayName?: string;
      };
      const map: Record<string, Entry> = {};

      // Count occurrences per shopping-list (unique lists containing the product)
      for (const list of lists || []) {
        const items: any[] = list.items || [];
        const seenInThisList = new Set<string>();
        for (const it of items) {
          const rawName = (it.item_name || it.item || '').toString().trim();
          if (!rawName) continue;
          const key = normalizeKey(rawName);
          if (!key) continue;
          const qty = Number(it.quantity || 0) || 0;
          const unit = Number(it.unit_price || it.unitPrice || 0) || 0;
          if (!map[key])
            map[key] = {
              totalQty: 0,
              occurrences: 0,
              totalPriceQty: 0,
              displayName: rawName,
            };
          map[key].totalQty += qty;
          map[key].totalPriceQty += unit * qty;
          if (!seenInThisList.has(key)) {
            seenInThisList.add(key);
            map[key].occurrences += 1;
            // set/refresh a nicer display name
            map[key].displayName = titleCase(map[key].displayName || rawName);
          }
        }
      }

      const products = Object.keys(map).map((k) => {
        const entry = map[k];
        const avgQty = entry.occurrences
          ? entry.totalQty / entry.occurrences
          : 0;
        const avgUnitPrice = entry.totalQty
          ? entry.totalPriceQty / entry.totalQty
          : 0;
        return {
          name: entry.displayName || titleCase(k),
          total: entry.totalQty,
          occurrences: entry.occurrences,
          avgQty,
          avgUnitPrice,
        };
      });

      products.sort((a, b) => b.total - a.total);
      this.products = products.slice(0, 5);
      // animate update
      this.updated = true;
      setTimeout(() => (this.updated = false), 600);
    } catch (err) {
      console.error('Error loading top products', err);
      this.error = 'Unable to load top products';
      this.products = [];
    } finally {
      this.loading = false;
    }
  }

  async refresh() {
    await this.load();
  }
}
