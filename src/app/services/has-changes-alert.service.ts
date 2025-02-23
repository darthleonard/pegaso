import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class HasChangesAlertService {
  constructor(private readonly alertController: AlertController) {}

  async presentAlert(message: string): Promise<boolean> {
    const alert = await this.alertController.create({
      header: 'Unsaved Changes',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return false;
          },
        },
        {
          text: 'Leave',
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
