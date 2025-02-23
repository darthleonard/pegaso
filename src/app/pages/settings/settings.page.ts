import { Component, OnInit } from '@angular/core';
import { ConnectivityService } from 'src/app/services/connectivity.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  standalone: false,
})
export class SettingsPage implements OnInit {
  constructor(private readonly connectivityService: ConnectivityService) {}

  config = {
    apiUrl: environment.apiUrl,
    online: false
  }

  ngOnInit() {
    
  }
}
