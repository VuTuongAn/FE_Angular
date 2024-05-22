import { Component, ViewChild } from '@angular/core';
import { RegisterDTO } from '../../dtos/user/register.dto';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from 'express';
import { UserService } from '../../services/user.service,';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  // Khai báo các biến tương ứng với trường dữ liệu trong form
  phoneNumber: string;
  password: string;
  retypePassword: string;
  fullName: string;
  address: string;
  isAccepted: boolean;
  dateOfBirth: Date;
  // Phải inject vào mới gọi được api, gửi api

  constructor(private router: Router, private userService: UserService) {
    this.phoneNumber = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.address = '';
    this.isAccepted = false;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }
  onPhoneNumberChange() {
    console.log('Mày đã thay đổi input phone');
  }
  register() {
    const registerDTO: RegisterDTO = {
      fullname: this.fullName,
      phone_number: this.phoneNumber, // Đổi thành phone_number
      address: this.address,
      password: this.password,
      retype_password: this.retypePassword, // Đổi thành retype_password
      date_of_birth: this.dateOfBirth, // Đổi thành date_of_birth
      facebook_account_id: 0,
      google_account_id: 0,
      role_id: 2,
    };
    this.userService.register(registerDTO).subscribe({
      next: (response: any) => {
        // Xử lý kết quả trả về khi đăng ký thành công
        // this.router.navigate(['/login']);
      },
      // Giống với finally lỗi hay không lỗi đều bắn qua
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        // Xử lý lỗi nếu có
        alert(`Đăng ký thất bại, lỗi : ${error.error}`);
      },
    });
  }

  // Kiểm tra mật khẩu khớp
  checkPasswordMatch() {
    if (this.password !== this.retypePassword) {
      this.registerForm.form.controls['retypePassword'].setErrors({
        passwordMismatch: true,
      });
    } else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }

  checkAge() {
    if (this.dateOfBirth) {
      const today = new Date();``
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff == 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      if (age < 18) {
        this.registerForm.form.controls[`dateOfBirth`].setErrors({
          invalidAge: true,
        });
      } else {
        this.registerForm.form.controls[`dateOfBirth`].setErrors(null);
      }
    }
  }
}
