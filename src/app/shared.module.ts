import { CommonModule, } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { FormsModule } from "@angular/forms";
import { PageHeaderComponent } from "./component/page-header/page-header.component"; 
import { GeoMasterComponent } from "./component/geo-master/geo-master.component";


@NgModule({
  declarations: [
   
    PageHeaderComponent,
    GeoMasterComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule
  ],
  exports: [
   
    PageHeaderComponent,
    GeoMasterComponent

  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SharedModule { }
