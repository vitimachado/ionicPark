import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoadingService } from "../loading/loading.service";

@Injectable()
export class LoandingInterceptor implements HttpInterceptor {
    constructor(public loadingService: LoadingService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.show();
        return next.handle(request).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
}