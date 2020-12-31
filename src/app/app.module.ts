import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { LoadingModule } from './components/loading/loading.module';
import { InterceptorModule } from './services/interceptors/interceptor.module';
import { Brightness } from '@ionic-native/brightness/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { HTTP } from '@ionic-native/http/ngx';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    NgxMaskModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    LoadingModule,
    InterceptorModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Brightness,
    HTTP,
    Geolocation,
    LaunchNavigator,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
