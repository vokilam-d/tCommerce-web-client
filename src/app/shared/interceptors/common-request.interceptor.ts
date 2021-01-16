import { Inject, Injectable, Optional } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { LanguageService } from '../../services/language/language.service';

@Injectable()
export class CommonRequestInterceptor implements HttpInterceptor {
  constructor(
    @Optional() @Inject(REQUEST) private serverReq: Request,
    private languageService: LanguageService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const headers = this.getHeaders(request.headers);
    const params = this.getParams(request.params);
    const cloned = request.clone({ headers, params });

    return next.handle(cloned);
  }

  private getHeaders(headers: HttpHeaders) {
    if (!this.serverReq) { return headers; }
    const cookieStr = this.serverReq.get('cookie');
    if (!cookieStr) { return headers; }

    return headers.set('cookie', cookieStr);
  }

  private getParams(params: HttpParams) {
    const lang = this.languageService.getCurrentLang();

    return params.set('lang', lang);
  }
}
