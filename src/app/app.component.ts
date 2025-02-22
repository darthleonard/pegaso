import { Component, OnInit } from '@angular/core';
import { localDatabase } from './database/local-database';
import { NetworkService } from './services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(private readonly networkService: NetworkService) {}

  ngOnInit(): void {
    for (const table of localDatabase.tables) {
      console.log('Download data from:', table.name);
    }

    this.networkService.checkConnection().then((status) => {
      if (status.connected) {
        console.log('Connected to:', status.connectionType);
      } else {
        console.log('No connection');
      }
    });
  }
}
