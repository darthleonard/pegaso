import { Component, OnInit } from '@angular/core';
import { Network } from '@capacitor/network';
import { localDatabase } from './database/local-database';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.checkNetworkStatus();
    for (const table of localDatabase.tables) {
      console.log('Download data from:', table.name);
    }
  }

  async checkNetworkStatus() {
    const status = await Network.getStatus();
    if (status.connected) {
      console.log('You are online');
    } else {
      console.log('No internet connection');
    }
  }
}
