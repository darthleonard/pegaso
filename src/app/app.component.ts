import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AppInitializerService } from './services/app-initializer.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly loadingController: LoadingController,
    private readonly appInitializerService: AppInitializerService
  ) {}

  loaded = false;

  ngOnInit(): void {
    this.initialize();
  }

  async initialize() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });

    // Pass the loading and setLoaded callback to the service
    this.appInitializerService.initialize(loading, (value: boolean) => {
      this.loaded = value;
    });
  }
}
