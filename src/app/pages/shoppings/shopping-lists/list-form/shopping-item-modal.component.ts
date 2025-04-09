import { Component, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';
import { DataService } from 'src/app/services/data.service';
import { ShoppingListItem } from '../shopping-list-item';
import { shoppingListItemFormMetadata } from './shopping-list-item-form.metadata';

@Component({
  selector: 'app-shopping-item-modal',
  templateUrl: './shopping-item-modal.component.html',
  providers: [DataService],
  standalone: false,
})
export class ShoppingItemModalComponent {
  private listId = '';

  @Output() itemSelected = new EventEmitter<any>();

  isModalOpen = false;
  metadata = shoppingListItemFormMetadata;
  shoppingListItem = {} as ShoppingListItem;

  open(listId: string, shoppingListItem?: ShoppingListItem) {
    this.listId = listId;
    if(shoppingListItem) {
      this.shoppingListItem = shoppingListItem;
    }
    this.isModalOpen = true;
  }

  cancel() {
    this.isModalOpen = false;
  }

  onFormSubmit(model: any) {
    const item = {
      id: '',
      list_id: this.listId,
      quantity: model.quantity ?? 0,
      unit_price: model.unit_price ?? '',
      notes: model.notes,
      item_id: '',
      item_name: model.item_name,
    } as ShoppingListItem;
    this.itemSelected.emit(item);
    this.isModalOpen = false;
  }
}
