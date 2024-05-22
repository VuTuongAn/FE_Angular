import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'access_token';
  localStorage?:Storage;
  constructor(@Inject(DOCUMENT) private document: Document){
          this.localStorage = document.defaultView?.localStorage;
  }

  // Lấy ra token
    getToken(): string | null {
      return this.localStorage?.getItem(this.TOKEN_KEY) ?? '';
    }
    // Cập nhật token mới
    setToken(token: string): void{
      this.localStorage?.setItem(this.TOKEN_KEY, token);
    }
    removeToken(): void{
      this.localStorage?.removeItem(this.TOKEN_KEY);
    }
}
