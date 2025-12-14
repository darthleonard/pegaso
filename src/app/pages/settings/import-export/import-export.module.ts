import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/components/components.module';

import { ImportExportPageRoutingModule } from './import-export-routing.module';
import { ImportExportPage } from './import-export.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ImportExportPageRoutingModule,
  ],
  declarations: [ImportExportPage],
})
export class ImportExportPageModule {}
