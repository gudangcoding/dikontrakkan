import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { restApi } from 'src/provider/restApi';
import { FCMPlugin } from 'cordova-plugin-fcm-with-dependecy-updated';



@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [restApi,FCMPlugin,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
