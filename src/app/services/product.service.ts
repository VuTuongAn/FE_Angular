import { Injectable } from "@angular/core";
import { environment } from "../environments/environments";
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "../responses/apiResponse";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiBaseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}
  getProducts(
    keyword: string,
    categoryId: number,
    page: number,
    limit: number
  ): Observable<ApiResponse> {
    const params = {
      keyword: keyword,
      category_id: categoryId.toString(),
      page: page.toString(),
      limit: limit.toString()
    };
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/products`, { params });
  }

  getDetailProduct(productId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/products/${productId}`);
  }



}
