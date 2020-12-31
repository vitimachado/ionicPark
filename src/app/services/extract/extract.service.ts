import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpProvider } from '../http-provider/http-provider.service';

export const TOKEN_KEY = 'login-token';
const url_extract = environment.endpoints.extract;

@Injectable({
  providedIn: 'root'
})
export class ExtractService {
  isMobileWeb: boolean;
  
  constructor(private httpProvider: HttpProvider) {}
 
  extracts(): Promise<any> {      
    return this.httpProvider.getHttp(url_extract)
      .then((data: any) => {
        try {
          console.log('extracts', data)
          return data.body.extracts;
        } catch(e) {
          return null;
        }
      })
  }
 
}
