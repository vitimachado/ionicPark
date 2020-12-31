import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class HttpProvider {
    http;
    isMobileWeb;
    header;
    sub: Subscription;

    constructor(
      private platform: Platform,
      private angularHttp: HttpClient,
      private nativeHttp: HTTP,
      private loadingService: LoadingService,
      private authenticationService: AuthenticationService) { 
      this.isMobileWeb = this.platform.is('mobileweb');
      this.sub = this.authenticationService.token
      .subscribe(token => {
        this.header = {
          'Authorization': 'Bearer ' + token
        }
      });
    }

    public getHttp(url: string): Promise<any> {
      if(this.isMobileWeb) {
        return this.angularHttp.get(url, { observe: 'response' })
          .toPromise()
          .then((data: any) => data)
       }
       else {
        this.loadingService.show();
        return this.nativeHttp.get(url, {}, this.header)
        .then((data: any) => {
          return {
            body:  JSON.parse(data.data),
            status: data.status
          }
        })
        .finally(() => this.loadingService.hide())
      }      
    }

    public postHttp(url: string, body: Object): Promise<any> {
      if(this.isMobileWeb) {
        return this.angularHttp.post(url, body, { observe: 'response' })
          .toPromise()
          .then((data: any) => data)
       }
       else {
        this.loadingService.show();       // O loading foi adicionado diretamente, pois o http nativo não aciona o Interceptor
        return this.nativeHttp.post(url, body, this.header)
        .then((data: any) => {
          return {
            body:  JSON.parse(data.data),
            status: data.status
          }
        })
        .finally(() => this.loadingService.hide())
      }      
    }
}