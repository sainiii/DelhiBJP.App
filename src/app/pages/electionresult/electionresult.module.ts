import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElectionresultPageRoutingModule } from './electionresult-routing.module';

import { ElectionresultPage } from './electionresult.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModule,
    ElectionresultPageRoutingModule
  ],
  declarations: [ElectionresultPage]
})
export class ElectionresultPageModule {}
