import { Inject, Injectable, Optional } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

@Injectable()
export class CommonRequestInterceptor implements HttpInterceptor {

  constructor(@Optional() @Inject(REQUEST) private serverReq: Request) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const headers = this.getHeaders(request.headers);
    const cloned = request.clone({ headers });

    return next.handle(cloned);
  }

  private getHeaders(headers: HttpHeaders) {
    if (!this.serverReq) { return headers; };
    const cookieStr = this.serverReq.get('cookie');
    if (!cookieStr) { return headers; }

    return headers.set('cookie', cookieStr);
  }
}
