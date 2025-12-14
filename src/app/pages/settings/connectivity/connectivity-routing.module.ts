import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectivityPage } from './connectivity.page';
import { UnsavedChangesGuard } from 'src/app/guards/unsaved-changes.guard';

const routes: Routes = [
  {
    path: '',
    component: ConnectivityPage,
    canDeactivate: [UnsavedChangesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectivityPageRoutingModule {}
