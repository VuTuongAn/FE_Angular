import { Component, ViewChild } from '@angular/core';
import { LoginDTO } from '../../dtos/user/login.dto';
import { LoginResponse } from '../../responses/user/login.response';
import { Role } from '../../models/roles';
import { RoleService } from '../../services/role.service';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service,';
import { Router } from 'express';
import { FormsModule, NgForm } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService
    ) {
  }
  @ViewChild('loginForm') loginForm!: NgForm;
  // Khai báo các biến tương ứng với trường dữ liệu trong form
  phoneNumber: string = '';
  password: string = '';
  // Phải inject vào mới gọi được api, gửi api

  roles: Role[] = []; // Mảng role
  remenberMe: boolean = true;
  selectedRole: Role | undefined; // Biến role để lưu được giá trị từ dropdown

// Khi mà trang Login được load thì nó sẽ nhảy vào để lấy ngOniInit
// Mặc định lấy role đầu tiên điền lên trên form
ngOnInit() {
  // Gọi API lấy danh sách roles và lưu vào biến roles
  debugger
  this.roleService.getRoles().subscribe({
    next: (roles: Role[]) => { // Sử dụng kiểu Role[]
      debugger
      this.roles = roles;
      // Kiểm tra độ dài của role nếu mà lớn hơn 0 thì mình mới lấy còn không thì để undefined
      this.selectedRole = roles.length > 0 ? roles[0] : undefined;
    },
    complete: () => {
      debugger
    },
    error: (error: any) => {
      debugger
      console.error('Error getting roles:', error);
    }
  });
}
  onPhoneNumberChange() {
    console.log('Mày đã thay đổi input phone');
  }


  login() {
    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 2
    };
    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        // Muốn sử dụng token trong các yêu cầu API thì phải gắn vào Headers

        // Lấy được ra dữ liệu từ interface
      const {token} = response;
      // console.log('Token:', token);

      // // Lưu token lại
      if(this.remenberMe){
      alert('Đăng nhập thành công');
      this.tokenService.setToken(token);
      }
      alert('Đăng nhập thành công + ' + response.token);
        // this.router.navigate(['/login']);
      },
      // Giống với finally lỗi hay không lỗi đều bắn qua
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        const errorMessage = error.error?.message;
        alert('Đăng nhập thất bại');
      },
    });
  }

}
