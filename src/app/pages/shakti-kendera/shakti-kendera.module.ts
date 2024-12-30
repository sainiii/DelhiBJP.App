import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShaktiKenderaPageRoutingModule } from './shakti-kendera-routing.module';
import { ShaktiKenderaPage } from './shakti-kendera.page';
import { SharedModule } from 'src/app/shared.module';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SharedModule,
    ShaktiKenderaPageRoutingModule
  ],
  declarations: [ShaktiKenderaPage],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ShaktiKenderaPageModule {}
