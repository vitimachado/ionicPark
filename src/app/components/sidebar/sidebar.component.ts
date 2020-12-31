import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
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
 
}
