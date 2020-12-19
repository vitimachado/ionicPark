import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ExtractService } from 'src/app/services/extract.service';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/services/user.model';

const USER_KEY = 'user-data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  name: String;
  cpf: String;
  userKey: User;

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Extratos',
      url: '/home',
      icon: 'archive'
    },
  ];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private menu: MenuController,
    private storage: StorageService) { }

  ngOnInit() { 
    this.canLoad();
  }

  async canLoad() {
    await this.storage.getObject(USER_KEY).then((hasUser: any) => this.userKey = hasUser);    
  }

  openMenu() {
    this.menu.open('start');
  }
 
  async logout() {
    console.log('logout')
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
