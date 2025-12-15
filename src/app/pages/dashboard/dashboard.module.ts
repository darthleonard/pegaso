import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { CurrentBillComponent } from './current-bill/current-bill.component';
import { TopProductsComponent } from './top-products/top-products.component';
import { RecentFuelComponent } from './recent-fuel/recent-fuel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DashboardPageRoutingModule,
  ],
  declarations: [
    DashboardPage,
    CurrentBillComponent,
    TopProductsComponent,
    RecentFuelComponent,
  ],
})
export class DashboardPageModule {}
