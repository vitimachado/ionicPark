import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { environment } from '../../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';

export const TOKEN_KEY = 'login-token';
const url_extract = environment.endpoints.extract;

@Injectable({
  providedIn: 'root'
})
export class ExtractService {
  token = '';
  
  constructor(
    private http: HTTP,
    private storageService: StorageService) {
    this.loadToken();
  }
 
  async loadToken() {
    const token = await this.storageService.getString(TOKEN_KEY);   
    this.token = token.value; 
  }
 
  extracts(userToken): Promise<any> {   
    return this.http.post(url_extract, { token: userToken}, {})
    .then(data => {
      try {
        data.data = JSON.parse(data.data);
        return data.data.extracts;
      } catch(e) {
        return null;
      }
    })
  }
 
}
