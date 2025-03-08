import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingStoresPage } from './stores-list/shopping-stores.page';
import { ShoppingStoreFormPage } from './store-form/shopping-store-form.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingStoresPage
  },
  {
    path: 'store-form',
    component: ShoppingStoreFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingStoresPageRoutingModule {}
