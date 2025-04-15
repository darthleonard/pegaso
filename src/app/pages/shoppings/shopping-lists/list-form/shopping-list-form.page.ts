import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { FormComponent } from 'src/app/components/form/form/form.component';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';
import { shoppingListFormMetadata } from './shopping-list-form.metadata';
import { ShoppingList } from '../shopping-list';
import { ShoppingListItem } from '../shopping-list-item';
import { ShoppingItemModalComponent } from './shopping-item-modal.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-shopping-list-form',
  templateUrl: './shopping-list-form.page.html',
  providers: [DataService],
  standalone: false,
})
export class ShoppingListFormPage implements OnInit {
  @ViewChild(FormComponent) private readonly form!: FormComponent;
  @ViewChild(ShoppingItemModalComponent)
  private readonly itemModal!: ShoppingItemModalComponent;

  constructor(
    private readonly router: Router,
    private readonly location: Location,
    private readonly dataService: DataService<any>,
    private readonly alertService: AlertService,
    private readonly toastService: ToastService
  ) {}

  metadata = shoppingListFormMetadata;
  title = '';
  isEditing = false;
  shoppingList = {
    id: '',
    list_name: '',
    effective_date: new Date(),
    items_quantity: 0,
    total: 0,
    completed: 0,
    items: [] as ShoppingListItem[],
  } as ShoppingList;
  originalItems = [] as ShoppingListItem[];

  ngOnInit() {
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    let titlePrefix = 'Create';
    if (navigationState && navigationState['list']) {
      this.shoppingList = navigationState['list'];
      this.shoppingList.completed = this.shoppingList.completed ? 1 : 0;
      this.originalItems = [...this.shoppingList.items];
      this.updateFooterData();
      this.isEditing = true;
      titlePrefix = 'Edit';
    }
    this.title = `${titlePrefix} List`;
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
    return (
      this.form.hasChanges() ||
      !_.isEqual(this.originalItems, this.shoppingList.items)
    );
  }

  showUnsavedChangesAlert(): Promise<boolean> {
    return this.alertService.presentAlert({
      header: 'You have unsaved changes',
      message: 'Do you want to discard changes?',
    });
  }

  onAddProduct() {
    this.itemModal.open(this.shoppingList.id);
  }

  onEditProduct(item: ShoppingListItem) {
    this.itemModal.open(this.shoppingList.id, item);
  }

  onRemoveProduct(item: ShoppingListItem) {
    this.shoppingList.items = this.shoppingList.items.filter((i) => i !== item);
  }

  onItemSelected(item: ShoppingListItem) {
    let existingItem = this.shoppingList.items.findIndex(
      (i) => i.id === item.id
    );

    if (existingItem !== -1) {
      this.shoppingList.items[existingItem] = item;
    } else {
      this.shoppingList.items.push(item);
    }
    this.updateFooterData();
  }

  async onFormSubmit(formData: any) {
    try {
      const shoppingListData = formData;
      if (shoppingListData.list_name === '') {
        shoppingListData.list_name = 'Nueva Lista';
      }
      // await this.dataService.saveRecord(shoppingListData);
      this.form.form.reset();
      this.location.back();
    } catch (error: any) {
      this.form.error = `Error saving shoppingList: ${error.error.text}`;
    }
  }

  async onDelete() {
    // if (!this.shoppingList?.id) {
    //   return;
    // }
    try {
      //await this.dataService.deleteRecord(this.shoppingList);
      this.form.form.reset();
      this.location.back();
    } catch (error: any) {
      this.form.error = `Error deleting shoppingList ${error.error.message}`;
    }
  }

  private updateFooterData() {
    this.shoppingList.items_quantity = this.shoppingList.items.length;
    this.shoppingList.total = this.shoppingList.items.reduce(
      (acc, item) => acc + item.unit_price * item.quantity,
      0
    );
  }
}
