import { Injectable } from "@angular/core";
import { environment } from "../environments/environments";
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "../responses/apiResponse";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
private apiBaseUrl = environment.apiBaseUrl;
constructor(private http: HttpClient) {}

getCategoriesParam(keyword: string, page: number, limit: number): Observable<ApiResponse> {
  const params = {
    keyword: keyword,
    page: page.toString(),
    limit: limit.toString()
  };
  return this.http.get<ApiResponse>(`${environment.apiBaseUrl}/categories`, { params });
}
getCategories(): Observable<ApiResponse> {
  return this.http.get<ApiResponse>(`${environment.apiBaseUrl}/categories/products`);
}
}
