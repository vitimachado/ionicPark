import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WELCOME_KEY } from 'src/app/guards/intro.guard';
import { StorageService } from '../services/storage.service';
import { Brightness } from '@ionic-native/brightness/ngx';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

   slideOpts = {
    initialSlide: 0,
    direction: 'horizontal',
    loop: false,
    speed: 300,
    freeMode: true,
    freeModeSticky: true,
    slidesPerView: 1,
    spaceBetween: 60,
    centeredSlides: true,
  };
  currentBrightness = 1;

  constructor(
    private router: Router,
    private storage: StorageService,
    private brightness: Brightness) { }

  ngOnInit() {
    this.brightness.getBrightness()
    .then(value => this.currentBrightness = value)
    .finally(()=> {
      this.brightness.setBrightness(1);
    });
  }

  async start() {
    this.brightness.setBrightness(this.currentBrightness);
    await this.storage.setString(WELCOME_KEY, 'true');
    this.router.navigateByUrl('/home', { replaceUrl:true });
  }
}
