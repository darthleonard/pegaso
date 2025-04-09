import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnsavedChangesGuard } from 'src/app/guards/unsaved-changes.guard';

import { BillsListPage } from './bills-list/bills-list.page';
import { BillsFormPage } from './bills-form/bills-form.page';

const routes: Routes = [
  {
    path: '',
    component: BillsListPage,
  },
  {
    path: 'bills-form',
    component: BillsFormPage,
    canDeactivate: [UnsavedChangesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillsPageRoutingModule {}
