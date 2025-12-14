import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';
import { UnsavedChangesGuard } from 'src/app/guards/unsaved-changes.guard';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
  },
  {
    path: 'connectivity',
    loadChildren: () =>
      import('./connectivity/connectivity.module').then(
        (m) => m.ConnectivityPageModule
      ),
  },
  {
    path: 'import-export',
    loadChildren: () =>
      import('./import-export/import-export.module').then(
        (m) => m.ImportExportPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
