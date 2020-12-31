import { Component, OnInit } from '@angular/core';
import { ExtractService } from '../../services/extract/extract.service';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { LoginService } from 'src/app/services/login/login.service';
import { NavController, ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

import * as moment from 'moment';

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
    private loginService: LoginService,
    private extractService: ExtractService,
    private toastController: ToastController,
    private launchNavigator: LaunchNavigator,
    private navController: NavController) { }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  ngOnInit() {
    this.extractService.extracts()
    .then(
      res => {
        this.apiData = res;
      },
      err => {
        this.presentToast(err.statusText);
        if(err.status == 401) {
          this.loginService.logout();
        }
      },
    )
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
        () => console.log('Launched navigator'),
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
    await this.loginService.logout();
    this.navController.navigateBack('login');
  }
}
