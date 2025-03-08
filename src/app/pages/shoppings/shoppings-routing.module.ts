import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingsPage } from './shoppings.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingsPage,
    children:[
      {
        path: 'shopping-items',
        loadChildren: () => import('./shopping-items/shopping-items.module').then( m => m.ShoppingItemsPageModule)
      },
      {
        path: 'shopping-lists',
        loadChildren: () => import('./shopping-lists/shopping-lists.module').then( m => m.ShoppingListsPageModule)
      },
      {
        path: 'shopping-stores',
        loadChildren: () => import('./shopping-stores/shopping-stores.module').then( m => m.ShoppingStoresPageModule)
      },
      {
        path: '',
        redirectTo: 'shopping-lists',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingsPageRoutingModule {}
