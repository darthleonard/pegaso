import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/components/components.module';

import { ConnectivityPageRoutingModule } from './connectivity-routing.module';
import { ConnectivityPage } from './connectivity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ConnectivityPageRoutingModule,
  ],
  declarations: [ConnectivityPage],
})
export class ConnectivityPageModule {}
