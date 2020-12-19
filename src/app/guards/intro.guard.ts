import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const WELCOME_KEY = 'welcome-seen';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {
   
  constructor(private router: Router, private storage: StorageService) { }
 
  async canLoad(): Promise<boolean> {     
    return await this.storage.getString(WELCOME_KEY).then((hasSeenIntro: any) => {
      if (!hasSeenIntro.value || hasSeenIntro.value === 'false') {
        return true;
      } else {
        this.router.navigateByUrl('/home', { replaceUrl:true });
        return false;
      }
    });
  }
}
