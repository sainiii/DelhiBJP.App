import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BothwisePageRoutingModule } from './bothwise-routing.module';
import { BothwisePage } from './bothwise.page';
import { SharedModule } from 'src/app/shared.module';  
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModule,
    BothwisePageRoutingModule
  ],
  declarations: [BothwisePage  ],

  schemas:[NO_ERRORS_SCHEMA]
})
export class BothwisePageModule {}
