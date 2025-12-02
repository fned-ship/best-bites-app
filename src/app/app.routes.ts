import {  Routes } from '@angular/router';
import { Signup } from './routes/signup/signup';
import { Login} from './routes/login/login';
import { ResetPassword } from './routes/reset-password/reset-password';
import { NewPassword } from './routes/new-password/new-password';
import { Active } from './routes/active/active';
import { PageClient } from './routes/page-client/page-client';
import { Testing } from './routes/testing/testing';
import { AddStock } from './routes/add-stock/add-stock';
import { AddProduct } from './routes/add-product/add-product';
import { Chef } from './routes/chef/chef';
import { Deliverer } from './routes/deliverer/deliverer';
import { PageAdmin } from './routes/page-admin/page-admin';

export const routes: Routes = [
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'resetpassword', component: ResetPassword },
  { path: 'newpassword', component: NewPassword },
  { path: 'active/:securitycode', component: Active },
  {path: 'client', component:PageClient},
  { path: 'test', component: Testing },
  { path: 'addstock', component: AddStock },
  { path: 'addproduct', component: AddProduct },
  { path: 'deliverer', component: Deliverer },
  { path: 'chef',component:Chef},
  { path: 'admin',component:PageAdmin},
  { path: '**', redirectTo: 'login' }
];
