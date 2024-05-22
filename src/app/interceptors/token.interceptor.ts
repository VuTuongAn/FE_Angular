import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService){}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    if (token) {
      // Nhân bản request rồi set token cho thằng mới rồi tham chiếu ngược lại cho thằng cũ
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    // Đón được nó rồi nhét token vào rồi cho đi tiếp cho đi tiếp
    return next.handle(req);
    throw new Error('Method not implemented.');
  }
  // Đăng kí interceptor trong module là nhét token vào thằng beartoken
}
