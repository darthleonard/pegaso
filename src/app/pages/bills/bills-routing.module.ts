import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillsListPage } from './bills-list/bills-list.page';
import { BillsFormPage } from './bills-form/bills-form.page';

const routes: Routes = [
  {
    path: '',
    component: BillsListPage
  },
  {
    path: 'bills-form',
    component: BillsFormPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillsPageRoutingModule {}
