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
import { FormModalComponent } from './form/form-modal/form-modal.component';
import { SelectModalInputComponent } from './form/editors/select-modal/select-modal-input.component';

@NgModule({
  declarations: [
    MainMenuComponent,
    AppBillIconComponent,
    AppHeaderComponent,
    DateMonthInputComponent,
    FormComponent,
    FormModalComponent,
    SelectModalInputComponent,
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
    SelectModalInputComponent,
  ],
  providers: [DatePipe],
})
export class ComponentsModule {}
