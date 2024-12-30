import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttandancePageRoutingModule } from './attandance-routing.module';

import { AttandancePage } from './attandance.page';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AttandancePageRoutingModule
  ],
  declarations: [AttandancePage]
})
export class AttandancePageModule {}
