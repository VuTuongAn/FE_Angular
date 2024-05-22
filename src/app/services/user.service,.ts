import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpUtilService } from "./http.util.service";
import { environment } from "../environments/environments";
import { RegisterDTO } from "../dtos/user/register.dto";
import { Observable } from "rxjs";
import { LoginDTO } from "../dtos/user/login.dto";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // HttpClient là một service được cung cấp bởi Angular để gửi các HTTP request
  constructor(private http: HttpClient, private httpUtilService : HttpUtilService) {}

  private apiRegister = `${environment.apiBaseUrl}/users/register`; // Thêm scheme HTTP hoặc HTTPS
  private apiLogin = `${environment.apiBaseUrl}/users/login`; // Thêm scheme HTTP hoặc HTTPS
  private apiConfig = {
    headers: this.httpUtilService.createHeaders(),
  };

  register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
  }
}
