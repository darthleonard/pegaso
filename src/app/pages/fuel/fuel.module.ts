import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { FuelPageRoutingModule } from './fuel-routing.module';
import { FuelsListPage } from './fuel-list/fuels-list.page';
import { FuelFormPage } from './fuel-form/fuel-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonModule,
    ComponentsModule,
    FuelPageRoutingModule
  ],
  declarations: [FuelsListPage, FuelFormPage]
})
export class FuelPageModule {}
