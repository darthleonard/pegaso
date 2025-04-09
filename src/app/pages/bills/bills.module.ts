import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillsPageRoutingModule } from './bills-routing.module';
import { BillsListPage } from './bills-list/bills-list.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { BillsFormPage } from './bills-form/bills-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    BillsPageRoutingModule,
  ],
  declarations: [BillsListPage, BillsFormPage],
})
export class BillsPageModule {}
