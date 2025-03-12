import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.page.html',
  providers: [DataService],
  standalone: false,
})
export class ShoppingListsPage {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastService,
    private readonly dataService: DataService<any>
  ) {
    this.dataService.init('shoppingLists');
  }

  shoppingLists?: any[] | null;

  ionViewWillEnter() {
    this.loadShoppingLists();
  }

  async handleRefresh(event: CustomEvent) {
    await this.loadShoppingLists(true);
    (event.target as HTMLIonRefresherElement).complete();
  }

  async onClick(shoppingList?: any) {
    this.router.navigate(['/shoppings/shopping-lists/list-form'], {
      relativeTo: this.route,
      state: {
        list: shoppingList,
      }
    });
  }

  private async loadShoppingLists(refresh = false) {
    try {
      this.shoppingLists = await this.dataService.getAllRecords(refresh);
    } catch (error) {
      this.toastService.showError({
        message: `Error loading shopping items ${error}`,
      });
    }
  }
}
