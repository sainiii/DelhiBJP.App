import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoterregistratoinPageRoutingModule } from './voterregistratoin-routing.module';

import { VoterregistratoinPage } from './voterregistratoin.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,SharedModule,
    IonicModule,
    VoterregistratoinPageRoutingModule
  ],
  declarations: [VoterregistratoinPage]
})
export class VoterregistratoinPageModule {}
