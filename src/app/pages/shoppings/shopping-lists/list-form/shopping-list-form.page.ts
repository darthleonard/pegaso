import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormComponent } from 'src/app/components/form/form/form.component';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';
import { shoppingListFormMetadata } from './shopping-list-form.metadata';
import { ShoppingList } from '../shopping-list';
import { ShoppingListItem } from '../shopping-list-item';
import * as _ from 'lodash';

@Component({
  selector: 'app-shopping-list-form',
  templateUrl: './shopping-list-form.page.html',
  providers: [DataService],
  standalone: false,
})
export class ShoppingListFormPage implements OnInit {
  @ViewChild(FormComponent) private readonly form!: FormComponent;

  constructor(
    private readonly router: Router,
    private readonly location: Location,
    private readonly dataService: DataService<any>,
    private readonly alertService: AlertService
  ) {}

  metadata = shoppingListFormMetadata;
  title = '';
  isEditing = false;
  shoppingList = {
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
    return this.form.hasChanges() || !_.isEqual(this.originalItems, this.shoppingList.items);
  }

  showUnsavedChangesAlert(): Promise<boolean> {
    return this.alertService.presentAlert({
      header: 'You have unsaved changes',
      message: 'Do you want to discard changes?',
    });
  }

  onAddProduct() {
    // open modal to select/create item
    this.shoppingList.items.push({
      item_name: "" + this.shoppingList.items.length + 1,
    } as ShoppingListItem);
  }

  onRemoveProduct(product: any) {
    this.shoppingList.items = this.shoppingList.items.filter(
      (p) => p !== product
    );
  }

  async onFormSubmit(formData: any) {
    try {
      // const shoppingListData = formData;
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
}
