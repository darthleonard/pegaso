import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private readonly alertController: AlertController) {}

  async presentAlert(config: AlertConfig): Promise<boolean> {
    const alert = await this.alertController.create({
      header: config.header,
      message: config.message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return false;
          },
        },
        {
          text: 'Confirm',
          handler: () => {
            return true;
          },
        },
      ],
    });

    await alert.present();
    return new Promise<boolean>((resolve) => {
      alert.onDidDismiss().then((b) => {
        resolve(b.role === 'cancel' ? false : true);
      });
    });
  }
}

export type AlertConfig = {
  header: string,
  message: string,
}