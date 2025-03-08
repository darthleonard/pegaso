import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShoppingsPageRoutingModule } from './shoppings-routing.module';
import { ShoppingsPage } from './shoppings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingsPageRoutingModule
  ],
  declarations: [ShoppingsPage]
})
export class ShoppingsPageModule {}
