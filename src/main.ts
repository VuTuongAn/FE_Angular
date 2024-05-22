import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HomeComponent } from './app/components/home/home.component';
import { OrderComponent } from './app/components/order/order.component';
import { OrderComfirmComponent } from './app/components/order-comfirm/order-comfirm.component';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { DetailProductComponent } from './app/components/detail-product/detail-product.component';

// bootstrapApplication(HomeComponent, appConfig)
//   .catch((err) => console.error(err));
// bootstrapApplication(OrderComponent, appConfig)
//   .catch((err) => console.error(err));
// bootstrapApplication(OrderComfirmComponent, appConfig)
//   .catch((err) => console.error(err));
// bootstrapApplication(LoginComponent, appConfig)
//   .catch((err) => console.error(err));
// bootstrapApplication(RegisterComponent, appConfig)
//   .catch((err) => console.error(err));
bootstrapApplication(DetailProductComponent, appConfig)
  .catch((err) => console.error(err));
