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
// Re-importing CookieComponent to force update
import { CookiesComponent } from './pages/legal/cookie/cookies.component';

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
      { path: 'cookies', component: CookiesComponent },

      {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard],
        data: { role: 'ADMIN' },
      },

      {
        path: 'customer',
        component: CustomerDashboardComponent,
        canActivate: [AuthGuard],
        data: { role: 'CUSTOMER' },
      },
    ],
  },
];
