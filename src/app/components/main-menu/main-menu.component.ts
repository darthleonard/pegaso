import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectivityService } from 'src/app/services/connectivity.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
  standalone: false,
})
export class MainMenuComponent implements OnInit, OnDestroy {
  showSync = false;
  private subs: Subscription[] = [];

  constructor(private readonly connectivity: ConnectivityService) {}

  ngOnInit() {
    this.subs.push(
      this.connectivity.online$.subscribe((v) => (this.showSync = !!v))
    );
  }

  ngOnDestroy() {
    this.subs.forEach((s) => s.unsubscribe());
  }

  onMenuOpen() {}

  onMenuClose() {}
}
