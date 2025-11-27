import {  Routes } from '@angular/router';

// Import components
import { Signup } from './routes/signup/signup';
import { Login} from './routes/login/login';
import { ResetPassword } from './routes/reset-password/reset-password';
import { NewPassword } from './routes/new-password/new-password';
import { Active } from './routes/active/active';
import { Testing } from './routes/testing/testing';
import { Chef } from './routes/chef/chef';
import { Deliverer } from './routes/deliverer/deliverer';

export const routes: Routes = [
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'resetpassword', component: ResetPassword },
  { path: 'newpassword', component: NewPassword },
  { path: 'active/:securitycode', component: Active },
  { path: 'test', component: Testing },
  { path: 'deliverer', component: Deliverer },
  { path: 'chef',component:Chef},
  { path: '**', redirectTo: 'login' } // default/fallback route
];
