import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Subject, takeUntil } from 'rxjs';
import { AppInitializerService } from './services/app-initializer.service';
import { ToastModel, ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private readonly platform: Platform,
    private readonly loadingController: LoadingController,
    private readonly appInitializerService: AppInitializerService,
    private readonly toastService: ToastService
  ) {
    this.platform.ready().then(() => {
      StatusBar.setOverlaysWebView({ overlay: false });
      StatusBar.setStyle({ style: Style.Dark });
      App.addListener('appStateChange', (state) => {
        if (!state.isActive) {
          this.destroy$.next();
        }
      });

      this.toastService.config$
        .pipe(takeUntil(this.destroy$))
        .subscribe((toastConfig) => {
          if (!!toastConfig) {
            this.toastConfig = {
              message: toastConfig.message,
              type: toastConfig.type,
              duration: toastConfig.duration,
              icon: toastConfig.icon,
            };
            this.openModal(true);
          } else {
            this.toastConfig = undefined;
          }
        });
    });
  }

  loaded = false;
  toastConfig?: ToastModel;
  isToastOpen = false;

  ngOnInit(): void {
    this.initialize();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  openModal(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
