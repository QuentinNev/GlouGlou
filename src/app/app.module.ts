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
import { HttpClientModule } from '@angular/common/http'
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { LastUpdateService } from './_services/last-update.service';
import { ToasterService } from './_services/toaster.service';
import { SettingsService } from './_services/settings.service';
import { ThemeService } from './_services/theme.service';
import { NoteProvider } from './_providers/NoteProvider';

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
    LastUpdateService,
    ToasterService,
    SettingsService,
    ThemeService,
    NoteProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
