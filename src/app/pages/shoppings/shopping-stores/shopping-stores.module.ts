import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { ShoppingStoresPageRoutingModule } from './shopping-stores-routing.module';
import { ShoppingStoresPage } from './stores-list/shopping-stores.page';
import { ShoppingStoreFormPage } from './store-form/shopping-store-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ShoppingStoresPageRoutingModule
  ],
  declarations: [ShoppingStoresPage, ShoppingStoreFormPage ]
})
export class ShoppingStoresPageModule {}
