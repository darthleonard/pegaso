import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AppBillIconComponent } from './app-bill-icon/app-bill-icon.component';

@NgModule({
  declarations: [AppBillIconComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [AppBillIconComponent],
})
export class ComponentsModule {}
