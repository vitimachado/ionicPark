import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoandingInterceptor } from './http-interceptor.service';
import { TokenInterceptor } from './token-interceptor.service';

@NgModule({
    providers: [
        LoandingInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoandingInterceptor,
            multi: true,
        },
        TokenInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ],
})
export class InterceptorModule {}
