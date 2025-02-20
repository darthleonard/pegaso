import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AppBillIconComponent } from './app-bill-icon/app-bill-icon.component';
import { AppHeaderComponent } from './app-header/app-header.component';

@NgModule({
  declarations: [AppBillIconComponent, AppHeaderComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [AppBillIconComponent, AppHeaderComponent],
})
export class ComponentsModule {}
