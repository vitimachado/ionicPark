import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';

export const WELCOME_KEY = 'welcome-seen';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {
   
  constructor(
    private navController: NavController,
    private storage: StorageService) { }
 
  async canLoad(): Promise<boolean> {     
    return await this.storage.getString(WELCOME_KEY).then((hasSeenIntro: any) => {
      if (!hasSeenIntro.value || hasSeenIntro.value === 'false') {
        return true;
      } else {
        this.navController.navigateBack('home');
        return false;
      }
    });
  }
}
