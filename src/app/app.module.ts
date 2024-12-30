import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared.module';
 
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent   ],
  imports: [   
    
    IonicModule.forRoot({
      mode: 'md',
      // innerHTMLTemplatesEnabled: true
    }),
    HttpClientModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
