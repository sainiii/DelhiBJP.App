import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchvoterPageRoutingModule } from './searchvoter-routing.module';
import { SearchvoterPage } from './searchvoter.page';
import { SharedModule } from 'src/app/shared.module';;
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule, SharedModule,
    IonicModule,
    SearchvoterPageRoutingModule
  ],
  declarations: [SearchvoterPage  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SearchvoterPageModule { }
