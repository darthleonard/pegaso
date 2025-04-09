import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { PascalCasePipe } from 'src/app/pipes/pascal-case.pipe';
import { SyncPageRoutingModule } from './sync-routing.module';
import { SyncPage } from './sync.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SyncPageRoutingModule,
    PascalCasePipe
  ],
  declarations: [SyncPage],
})
export class SyncPageModule {}
