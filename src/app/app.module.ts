import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { WineBatchProvider } from './_providers/WineBatchProvider';
import { ConnectionStateProvider } from './_providers/ConnectionStateProvider';
import { HttpClientModule } from '@angular/common/http'
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { Network } from '@ionic-native/network/ngx'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    WineBatchProvider,
    QRScanner,
    Network,
    ConnectionStateProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
