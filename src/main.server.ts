import { bootstrapApplication } from '@angular/platform-browser';
import { HomeComponent } from './app/components/home/home.component';
import { config } from './app/app.config.server';
import { OrderComponent } from './app/components/order/order.component';
import { OrderComfirmComponent } from './app/components/order-comfirm/order-comfirm.component';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { DetailProductComponent } from './app/components/detail-product/detail-product.component';
// import { DetailProductComponent } from './app/components/detail-product/detail-product.component';

// const bootstrap = () => bootstrapApplication(HomeComponent, config);
// const bootstrap = () => bootstrapApplication(OrderComponent, config);
// const bootstrap = () => bootstrapApplication(OrderComfirmComponent, config);
// const bootstrap = () => bootstrapApplication(LoginComponent, config);
// const bootstrap = () => bootstrapApplication(RegisterComponent, config);
const bootstrap = () => bootstrapApplication(DetailProductComponent, config);



export default bootstrap;
