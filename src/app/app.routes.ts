import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './pages/customer/customer-dashboard/customer-dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { PrivacyComponent } from './pages/legal/privacy/privacy.component';
import { TermsComponent } from './pages/legal/terms/terms.component';
import { CookieComponent } from './pages/legal/cookie/cookie.component';
import { Bookings } from './pages/admin/bookings/bookings';
import { CustomerBookings } from './pages/customer/customer-bookings/customer-bookings.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'home', component: HomePageComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'contact', component: ContactUsComponent },

      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },

      // Legal Pages
      { path: 'privacy', component: PrivacyComponent },
      { path: 'terms', component: TermsComponent },
      { path: 'cookies', component: CookieComponent },

      {
        path: 'admin',
        canActivate: [AuthGuard],
        data: { role: 'ADMIN' },
        children: [
          { path: '', component: AdminDashboardComponent },
          { path: 'bookings', component: Bookings }
        ]
      },

      {
        path: 'customer',
        canActivate: [AuthGuard],
        data: { role: 'CUSTOMER' },
        children: [
          { path: '', component: CustomerDashboardComponent },
          { path: 'bookings', component: CustomerBookings }
        ]
      },
    ],
  },
];
