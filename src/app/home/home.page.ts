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
    // await this.storage.getString(WELCOME_KEY).then((hasSeenIntro: any) => this.welcomeKey = JSON.parse(hasSeenIntro.value));
    // await this.storage.getObject(USER_KEY).then((hasUser: any) => this.userKey = hasUser);
    await this.storage.getString(TOKEN_KEY).then((token: any) => {
      console.log('TOKEN_KEY', token.value)
      this.tokenKey = token.value;
      this.extractService.extracts(this.tokenKey)
      .then(
        res => {
          this.apiData = res;
        },
        err => {
          console.log('HTTP request err.', err)
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

  async logout() {
    await this.authenticationService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
