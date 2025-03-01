import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnsavedChangesGuard } from 'src/app/guards/unsaved-changes.guard';
import { FuelsListPage } from './fuel-list/fuels-list.page';
import { FuelFormPage } from './fuel-form/fuel-form.page';

const routes: Routes = [
  {
    path: '',
    component: FuelsListPage,
  },
  {
    path: 'fuel-form',
    component: FuelFormPage,
    canDeactivate: [UnsavedChangesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuelPageRoutingModule {}
