import { AuthenticationService } from '../services/authentication/authentication.service';
import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthenticationService,
    private navController: NavController) { }
 
  canLoad(): Observable<boolean> {    
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {          
          return true;
        } else {          
          this.navController.navigateBack('login');
          return false;
        }
      })
    );
  }
}