import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface HasChanges {
  hasChanges: () => boolean;
  showUnsavedChangesAlert: () => Promise<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard implements CanDeactivate<HasChanges> {
  canDeactivate(
    component: HasChanges
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (component.hasChanges && component.hasChanges()) {
      return component.showUnsavedChangesAlert();
    }
    return true;
  }
}
