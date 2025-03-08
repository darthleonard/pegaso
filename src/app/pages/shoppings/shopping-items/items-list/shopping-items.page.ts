import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shopping-items',
  templateUrl: './shopping-items.page.html',
  standalone: false
})
export class ShoppingItemsPage implements OnInit {

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) { }

  ngOnInit() {
  }

  async handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      (event.target as HTMLIonRefresherElement).complete();
    }, 1000);
  }

  async onCreateClick() {
    this.router.navigate(['/shoppings/shopping-items/item-form']);
  }
}
