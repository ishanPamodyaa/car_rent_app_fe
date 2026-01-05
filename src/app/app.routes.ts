import { Routes } from '@angular/router';
import { MainLayout as MainLayoutComponent } from './layout/main-layout/main-layout/main-layout';
import { HomePage as HomeComponent } from './page/home-page/home-page';
import { AboutUs as AboutComponent  } from './page/about-us/about-us';
import { ContactUs as ContactComponent } from './page/contact-us/contact-us';
import { Login as LoginComponent } from './login/login';
import { AdminDashboard as AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard';
import { CustomerDashboard as CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },

      { path: 'login', component: LoginComponent },

      {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard],
        data: { role: 'ADMIN' }
      },

      {
        path: 'customer',
        component: CustomerDashboardComponent,
        canActivate: [AuthGuard],
        data: { role: 'CUSTOMER' }
      }
    ]
  }];

