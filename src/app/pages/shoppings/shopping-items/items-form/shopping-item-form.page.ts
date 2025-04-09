import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormComponent } from 'src/app/components/form/form/form.component';
import { DataService } from 'src/app/services/data.service';
import { AlertService } from 'src/app/services/alert.service';
import { shoppingItemFormMetadata } from './shopping-items-form.metadata';
import { ShoppingItem } from '../shopping-item';

@Component({
  selector: 'app-shopping-item-form',
  templateUrl: './shopping-item-form.page.html',
  providers: [DataService],
  standalone: false,
})
export class ShoppingItemFormPage implements OnInit {
  @ViewChild(FormComponent) private readonly form!: FormComponent;
  
  constructor(
    private readonly router: Router,
    private readonly location: Location,
    private readonly dataService: DataService<ShoppingItem>,
    private readonly alertService: AlertService
  ) {
    this.dataService.init('shoppingItems');
  }

  metadata = shoppingItemFormMetadata;
  title = '';
  isEditing = false;
  shoppingItem: ShoppingItem | null = null;

  ngOnInit() {
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    let titlePrefix = 'Create';
    this.shoppingItem = {} as ShoppingItem;
    if (navigationState && navigationState['item']) {
      this.shoppingItem = navigationState['item'];
      this.isEditing = true;
      titlePrefix = 'Edit';
    }
    this.title = `${titlePrefix} Product`;
  }

  ionViewWillEnter() {
    const tabBar = document.querySelector('ion-tab-bar');
    if (tabBar) {
      tabBar.style.display = 'none';
    }
  }

  ionViewWillLeave() {
    const tabBar = document.querySelector('ion-tab-bar');
    if (tabBar) {
      tabBar.style.display = '';
    }
  }

  hasChanges(): boolean {
    return this.form.hasChanges();
  }

  showUnsavedChangesAlert(): Promise<boolean> {
    return this.alertService.presentAlert({
      header: 'You have unsaved changes',
      message: 'Do you want to discard changes?',
    });
  }

  async onFormSubmit(formData: any) {
    try {
      const shoppingItemData = formData;
      await this.dataService.saveRecord(shoppingItemData);
      this.form.form.reset();
      this.location.back();
    } catch (error: any) {
      this.form.error = `Error saving shoppingItem: ${error.error.text}`;
    }
  }

  async onDelete() {
    if (!this.shoppingItem?.id) {
      return;
    }
    try {
      await this.dataService.deleteRecord(this.shoppingItem);
      this.form.form.reset();
      this.location.back();
    } catch (error: any) {
      this.form.error = `Error deleting shoppingItem ${error.error.message}`;
    }
  }
}
