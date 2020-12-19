import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
    isLoading = new BehaviorSubject<boolean>(false);
    show() {
      console.log('this.isLoading.next(true)');
      this.isLoading.next(true);
    }
    hide() {
      console.log('this.isLoading.next(false)');
      this.isLoading.next(false);
    }
}