import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppBillIconComponent } from './app-bill-icon/app-bill-icon.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { DateMonthInputComponent } from './date-month-input/date-month-input.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FormComponent } from './form/form/form.component';
import { FormModalComponent } from './form-modal/form-modal.component';

@NgModule({
  declarations: [
    MainMenuComponent,
    AppBillIconComponent,
    AppHeaderComponent,
    DateMonthInputComponent,
    FormComponent,
    FormModalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    MainMenuComponent,
    AppBillIconComponent,
    AppHeaderComponent,
    DateMonthInputComponent,
    FormComponent,
    FormModalComponent,
  ],
  providers: [DatePipe],
})
export class ComponentsModule {}
