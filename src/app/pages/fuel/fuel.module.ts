import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuelPageRoutingModule } from './fuel-routing.module';

import { FuelPage } from './fuel.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonModule,
    ComponentsModule,
    FuelPageRoutingModule
  ],
  declarations: [FuelPage]
})
export class FuelPageModule {}
