import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { ShoppingListsPageRoutingModule } from './shopping-lists-routing.module';
import { ShoppingListsPage } from './lists-list/shopping-lists.page';
import { ShoppingListFormPage } from './list-form/shopping-list-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ShoppingListsPageRoutingModule
  ],
  declarations: [ShoppingListsPage, ShoppingListFormPage]
})
export class ShoppingListsPageModule {}
