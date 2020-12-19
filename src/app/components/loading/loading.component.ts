import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading: BehaviorSubject<boolean> = this.loadingService.isLoading;

  constructor(private loadingService: LoadingService){
    //this.isLoading = this.loadingService.isLoading;
  }  

}
