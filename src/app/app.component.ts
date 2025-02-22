import { Component, OnInit } from '@angular/core';
import { localDatabase } from './database/local-database';
import { NetworkService } from './services/network.service';
import { ConnectivityService } from './services/connectivity.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(private readonly connectivityService: ConnectivityService) {}

  ngOnInit(): void {
    for (const table of localDatabase.tables) {
      console.log('Download data from:', table.name);
    }

    // force to work offline for a while
    this.connectivityService.switchOnlineMode();
  }
}
