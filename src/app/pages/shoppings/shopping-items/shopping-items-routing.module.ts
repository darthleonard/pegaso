import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingItemsPage } from './items-list/shopping-items.page';
import { ShoppingItemFormPage } from './items-form/shopping-item-form.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingItemsPage
  },
  {
    path: 'item-form',
    component: ShoppingItemFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingItemsPageRoutingModule {}
