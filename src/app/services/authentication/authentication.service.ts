import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { Platform } from '@ionic/angular';  

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  TOKEN_KEY = 'login-token';
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  isMobileWeb: boolean;
  
  constructor(
    private storageService: StorageService,
    private platform: Platform) {
    this.loadToken();
    platform.ready()
    .then(() => this.isMobileWeb = this.platform.is('mobileweb') ? true : false );
  }
 
  async loadToken() {
    const token = await this.storageService.getString(this.TOKEN_KEY);    
    if (token && token.value) {
      this.token.next(token.value);
      this.isAuthenticated.next(true);
    } else {
      this.token.next(null);
      this.isAuthenticated.next(false);
    }
  }

  public getIsMobileWeb(): boolean {
    return this.isMobileWeb;
  }

  public getToken(): string {
    return this.token.value;
  }
 
}
