import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoadingService } from "../loading.service";

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(public loadingService: LoadingService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('!!!!!!!!loadingService', request);
        this.loadingService.show();
        return next.handle(request).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
}

// export class Interceptor implements HttpInterceptor {
//   intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
//    console.log(request);
//    return next.handle(request);
//   }
//  }