import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shopping-stores',
  templateUrl: './shopping-stores.page.html',
  standalone: false
})
export class ShoppingStoresPage implements OnInit {

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) { }

  ngOnInit() {
  }

  async handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      (event.target as HTMLIonRefresherElement).complete();
    }, 1000);
  }

  async onCreateClick() {
    this.router.navigate(['/shoppings/shopping-stores/store-form']);
  }

}
