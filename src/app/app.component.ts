import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ConnectivityService } from './services/connectivity.service';
import { DownloadService } from './services/download.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly downloadService: DownloadService,
    private readonly loadingController: LoadingController
  ) {}

  ngOnInit(): void {
    this.downloadService.download();
    this.presentAlert();
  }

  async presentAlert() {
    const loading = await this.loadingController.create({
      message: 'Pleaste wait, downloading the data...',
    });
    await loading.present();
    this.downloadService.downloadFinished$
      .pipe(filter((f) => f))
      .subscribe(async () => {
        await loading.dismiss();
      });
  }
}
