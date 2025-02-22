import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppBillIconComponent } from './app-bill-icon/app-bill-icon.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { DateMonthInputComponent } from './date-month-input/date-month-input.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

@NgModule({
  declarations: [
    MainMenuComponent,
    AppBillIconComponent,
    AppHeaderComponent,
    DateMonthInputComponent,
  ],
  imports: [CommonModule, IonicModule.forRoot(), RouterModule],
  exports: [
    MainMenuComponent,
    AppBillIconComponent,
    AppHeaderComponent,
    DateMonthInputComponent,
  ],
  providers: [DatePipe],
})
export class ComponentsModule {}
