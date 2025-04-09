import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnsavedChangesGuard } from 'src/app/guards/unsaved-changes.guard';
import { ShoppingListsPage } from './lists-list/shopping-lists.page';
import { ShoppingListFormPage } from './list-form/shopping-list-form.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListsPage,
  },
  {
    path: 'list-form',
    component: ShoppingListFormPage,
    canDeactivate: [UnsavedChangesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListsPageRoutingModule {}
