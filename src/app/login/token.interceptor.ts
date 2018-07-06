import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';

import { SharedService } from '../shared/shared.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: SharedService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url !== 'http://127.0.0.1:8000/rest-auth/login/') {
            if (request.url !== 'http://127.0.0.1:8000/api/signup/') {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Token ${this.auth.getToken()}`
                    }
                });
            }
        }
        return next.handle(request);
    }
}
