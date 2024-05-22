import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../responses/apiResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule]
})
// OnInit là một interface, nó chứa một phương thức ngOnInit(). Khi khởi tạo một component, Angular sẽ gọi phương thức ngOnInit() của component đó.
export class HomeComponent implements OnInit {
products: Product[] = [];
currentPage: number = 1;
itemsPerPage: number = 12; // số lượng sản phẩm trên 1 trang
pages: number[] = []; // danh sách trang
totalPages: number = 0; // tổng số trang
visiblePages: number [] = []; // lưu trữ trang hiển thị
keyword: string = "";
selectedCategoryId: number  = 0; // Giá trị category được chọn
categories: Category[] = [];

constructor(private productService: ProductService, private categoryService:CategoryService) { }

ngOnInit() {
  this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
  // this.getCategories();

}

searchProducts() {
  debugger;
  this.currentPage = 1;
  this.itemsPerPage = 12;
  this.getCategories();
  this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
}

getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number) {
  debugger;
  this.productService.getProducts(keyword, selectedCategoryId, page, limit).subscribe({
    next: (apiresponse: ApiResponse) => {
      debugger;
      const response = apiresponse.data;
      response.products.forEach((product: Product) => {
        product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
      });
      this.products = response.products;
      this.totalPages = response.totalPages;
      this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
    },
    complete: () => {
      debugger;
    },
    error: (error: HttpErrorResponse) => {
      debugger;
      console.error(error?.error?.message ?? '');
    }
  });
}


onPageChange(page: number) {
  debugger;
  this.currentPage = page < 0 ? 0 : page;
  this.getProducts(this.keyword, this.selectedCategoryId,this.currentPage, this.itemsPerPage);
}
//   Đầu tiên, nó xác định số lượng tối đa các trang có thể hiển thị (maxVisiblePages) là 5 và tính ra số trang hiển thị ở mỗi bên của trang hiện tại (halfVisiblePages).

// Tiếp theo, nó xác định trang bắt đầu (startPage) và trang kết thúc (endPage) của phân trang. startPage là trang hiện tại trừ đi halfVisiblePages nhưng không thể nhỏ hơn 1. endPage là startPage cộng thêm maxVisiblePages trừ đi 1 nhưng không thể lớn hơn tổng số trang (totalPages).

// Nếu số lượng trang từ startPage đến endPage nhỏ hơn maxVisiblePages, nó sẽ điều chỉnh lại startPage để đảm bảo có đủ maxVisiblePages.

// Cuối cùng, nó tạo ra một mảng mới với độ dài bằng số lượng trang từ startPage đến endPage, sau đó điền các giá trị cho mảng này bằng cách cộng startPage với chỉ số của mỗi phần tử.
generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
  const maxVisiblePages = 5;
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(currentPage - halfVisiblePages, 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  return new Array(endPage - startPage + 1).fill(0)
    .map((_, index) => startPage + index);
}

getCategories() {
  this.categoryService.getCategories().subscribe({
    next: (apiResponse: ApiResponse) => {
      debugger;
      const response = apiResponse.data;
      this.categories = response.categories;
    },
    complete: () => {
      debugger;
    },
    error: (error: HttpErrorResponse) => {
      debugger;
      console.error(error?.error?.message ?? '');
    }
  });
}
}
