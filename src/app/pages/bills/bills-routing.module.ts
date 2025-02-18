import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillsListPage } from './bills-list/bills-list.page';

const routes: Routes = [
  {
    path: '',
    component: BillsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillsPageRoutingModule {}
