import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';
import { UnsavedChangesGuard } from 'src/app/guards/unsaved-changes.guard';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
    canDeactivate: [UnsavedChangesGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
