import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-order-comfirm',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './order-comfirm.component.html',
  styleUrl: './order-comfirm.component.scss'
})
export class OrderComfirmComponent {

}
