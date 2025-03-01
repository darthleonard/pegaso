import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';
import { Fuel } from '../fuel';

@Component({
  selector: 'app-fuel-list',
  templateUrl: './fuels-list.page.html',
  styleUrls: ['./fuels-list.page.css'],
  providers: [DataService],
  standalone: false,
})
export class FuelsListPage {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastService,
    private readonly dataService: DataService<Fuel>
  ) {
    this.dataService.init('fuel');
  }

  fuels?: Fuel[] | null;

  ionViewWillEnter() {
    this.loadfuels();
  }

  async handleRefresh(event: CustomEvent) {
    this.fuels = null;
    await this.loadfuels(true);
    (event.target as HTMLIonRefresherElement).complete();
  }

  async loadfuels(refresh = false) {
    try {
      this.fuels = await this.dataService.getAllRecords(refresh);
    } catch (error) {
      this.toastService.showError({ message: `Error loading fuels ${error}` });
    }
  }

  async onCreateClick() {
    this.router.navigate(['/fuel/fuel-form'], {
      relativeTo: this.route,
    });
  }

  async onClick(fuel: Fuel) {
    this.router.navigate(['/fuel/fuel-form'], {
      relativeTo: this.route,
      state: {
        fuel: fuel,
      },
    });
  }
}
