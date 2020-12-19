import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { environment } from '../../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { Router } from '@angular/router';
import { WELCOME_KEY } from '../guards/intro.guard';
  
export const TOKEN_KEY = 'login-token';
const url_login = environment.endpoints.login;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  
  constructor(
    private http: HTTP,
    private router: Router,
    private storageService: StorageService) {
    this.loadToken();
  }
 
  async loadToken() {
    const token = await this.storageService.getString(TOKEN_KEY);    
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
 
  login(credentials: {cpf, password}): Promise<any> {
    return this.http.post(url_login, credentials, { })
    .then(data => {
      try {
        data.data = JSON.parse(data.data);
        from(this.storageService.setString(TOKEN_KEY, data.data.apiToken));
        this.isAuthenticated.next(true);
        return data;
      } catch(e) {
        return null;
      }
    })
  }
 
  logout(): void {
    this.isAuthenticated.next(false);
    this.storageService.removeItem(TOKEN_KEY);
    this.storageService.removeItem(WELCOME_KEY); // comentar para aparecer a mensagem de welcome apenas uma vez
    this.router.navigateByUrl('/', { replaceUrl:true });
  }
}
