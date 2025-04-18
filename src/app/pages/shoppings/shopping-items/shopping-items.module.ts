import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShoppingItemsPageRoutingModule } from './shopping-items-routing.module';
import { ShoppingItemsPage } from './items-list/shopping-items.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ShoppingItemFormPage } from './items-form/shopping-item-form.page';
import { PascalCasePipe } from 'src/app/pipes/pascal-case.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ShoppingItemsPageRoutingModule,
    PascalCasePipe
  ],
  declarations: [ShoppingItemsPage, ShoppingItemFormPage]
})
export class ShoppingItemsPageModule {}
