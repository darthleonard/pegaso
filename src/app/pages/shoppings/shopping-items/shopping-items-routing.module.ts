import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnsavedChangesGuard } from 'src/app/guards/unsaved-changes.guard';
import { ShoppingItemsPage } from './items-list/shopping-items.page';
import { ShoppingItemFormPage } from './items-form/shopping-item-form.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingItemsPage,
  },
  {
    path: 'item-form',
    component: ShoppingItemFormPage,
    canDeactivate: [UnsavedChangesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingItemsPageRoutingModule {}
