import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { DataService } from 'src/app/services/data.service';
import { ShoppingItem } from '../shopping-item';

@Component({
  selector: 'app-shopping-items',
  templateUrl: './shopping-items.page.html',
  providers: [DataService],
  standalone: false,
})
export class ShoppingItemsPage {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastService,
    private readonly dataService: DataService<ShoppingItem>
  ) {
    this.dataService.init('shoppingItems');
  }

  shoppingItems?: ShoppingItem[] | null;

  ionViewWillEnter() {
    this.loadShoppingItems();
  }

  async handleRefresh(event: CustomEvent) {
    this.shoppingItems = null;
    await this.loadShoppingItems(true);
    (event.target as HTMLIonRefresherElement).complete();
  }

  async loadShoppingItems(refresh = false) {
    try {
      this.shoppingItems = await this.dataService.getAllRecords(refresh);
    } catch (error) {
      this.toastService.showError({
        message: `Error loading shopping items ${error}`,
      });
    }
  }

  async onClick(shoppingItem: ShoppingItem) {
    this.router.navigate(['/shoppings/shopping-items/item-form'], {
      relativeTo: this.route,
      state: {
        item: shoppingItem,
      },
    });
  }

  async onCreateClick() {
    this.router.navigate(['/shoppings/shopping-items/item-form']);
  }
}
