import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WELCOME_KEY } from '../../guards/intro.guard';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpProvider } from '../http-provider/http-provider.service';
import { StorageService } from '../storage/storage.service';

const url_login = environment.endpoints.login;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private storageService: StorageService,
    private httpProvider: HttpProvider,
    private navController: NavController,
    private authenticationService: AuthenticationService) { }
  
  login(credentials: {cpf, password}): Promise<any> {
    return this.httpProvider.postHttp(url_login, credentials)
      .then((data: any) => {
        try {
          from(this.storageService.setString(this.authenticationService.TOKEN_KEY, data.body.apiToken));
          this.setTokenAuthenticated(data.body.apiToken);
          return data;
        } catch(e) {
          this.setTokenAuthenticated(null);
          return null;
        }
      })
  }
 
  logout(): void {
    this.setTokenAuthenticated(null);
    this.storageService.removeItem(this.authenticationService.TOKEN_KEY);
    this.storageService.removeItem(WELCOME_KEY); // comentar para aparecer a mensagem de welcome apenas uma vez
    this.navController.navigateBack('login');
  }

  setTokenAuthenticated(token: string) {
    this.authenticationService.token.next(token);
    this.authenticationService.isAuthenticated.next(token ? true : false);
  }
}
