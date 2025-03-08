import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-shopping-list-form',
  templateUrl: './shopping-list-form.page.html',
  standalone: false
})
export class ShoppingListFormPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private tabs: IonTabs) { }

  ngOnInit() {
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

}
