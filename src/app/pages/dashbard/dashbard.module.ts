import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashbardPageRoutingModule } from './dashbard-routing.module';

import { DashbardPage } from './dashbard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashbardPageRoutingModule
  ],
  declarations: [DashbardPage]
})
export class DashbardPageModule {}
