import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private config = new BehaviorSubject<ToastModel | null>(null);

  config$ = this.config.asObservable();

  show(config: ToastConfig) {
    this.config.next({
      message: config.message,
      duration: config.duration ?? 2000,
      type: ToastType.None,
    } as ToastModel);
  }

  showSuccess(config: ToastConfig) {
    this.config.next({
      message: config.message,
      type: ToastType.Success,
      icon: 'checkmark-circle-outline',
      duration: config.duration ?? 2000,
    } as ToastModel);
  }

  showAlert(config: ToastConfig) {
    this.config.next({
      message: config.message,
      type: ToastType.Alert,
      icon: 'alert-circle-outline',
      duration: config.duration ?? 2000,
    } as ToastModel);
  }

  showError(config: ToastConfig) {
    this.config.next({
      message: config.message,
      type: ToastType.Error,
      icon: 'close-circle-outline',
      duration: config.duration ?? 3000,
    } as ToastModel);
  }
}

export type ToastConfig = {
  message: string;
  duration?: number;
};

export type ToastModel = {
  message: string;
  type: ToastType;
  icon?: string;
  duration: number;
};

export enum ToastType {
  None = 'toast-normal',
  Success = 'toast-success',
  Alert = 'toast-alert',
  Error = 'toast-error',
}
