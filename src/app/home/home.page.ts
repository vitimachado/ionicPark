import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { WELCOME_KEY } from '../guards/intro.guard';
import { ExtractService } from '../services/extract.service';
import { AuthenticationService } from '../services/authentication.service';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;


import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import * as moment from 'moment'

const USER_KEY = 'user-data';
const TOKEN_KEY = 'login-token';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  apiData: any[];
  dateFormat: string = "HH:mm:ss dd/MM/yyyy";
  diffDateTime: any;
  welcomeKey: string = "null";
  tokenKey: string = "null";
  userKey: {};  

  constructor(
    private router: Router,
    private storage: StorageService,
    private authenticationService: AuthenticationService,
    private extractService: ExtractService,
    private toastController: ToastController,
    private launchNavigator: LaunchNavigator) { }

    async presentToast(msg: string) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 3000
      });
      toast.present();
    }
 
  async canLoad() {
    await this.storage.getString(TOKEN_KEY).then((token: any) => {
      this.tokenKey = token.value;
      this.extractService.extracts(this.tokenKey)
      .then(
        res => {
          this.apiData = res;
        },
        err => {
          this.presentToast(err.statusText);
          if(err.status == 401) {
            this.authenticationService.logout();
          }
        },
      )
    });      
  }

  ngOnInit() {
    this.canLoad();
  }

  goToAdress(adress: string) {
    Geolocation.getCurrentPosition().then((resp) => {
      this.launchNavigator.navigate(
        adress,
        {
          start: `${resp.coords.latitude}, ${resp.coords.longitude}`,
          app: this.launchNavigator.APP.USER_SELECT
        }
      )    
      .then(
        success => console.log('Launched navigator'),
        error => this.presentToast(error)
      );
     }).catch((error) => {
        this.presentToast(error)
     });
     
  }

  getDiffDateTIme(dataEntrada, dataSaida) {
    var a = moment(dataEntrada);
    var b = moment(dataSaida);
    var ms = moment(b,"DD/MM/YYYY HH:mm:ss").diff(moment(a,"DD/MM/YYYY HH:mm:ss"));
    var d = moment.duration(ms);
    return Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
  }

  async logout() {
    await this.authenticationService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
