import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AppBillIconComponent } from './app-bill-icon/app-bill-icon.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { DateMonthInputComponent } from './date-month-input/date-month-input.component';

@NgModule({
  declarations: [AppBillIconComponent, AppHeaderComponent, DateMonthInputComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [AppBillIconComponent, AppHeaderComponent, DateMonthInputComponent],
  providers: [DatePipe],
})
export class ComponentsModule {}
