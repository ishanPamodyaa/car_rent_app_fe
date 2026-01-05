import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-customer-navbar',
  imports: [],
  templateUrl: './customer-navbar.html',
  styleUrl: './customer-navbar.css',
})
export class CustomerNavbar {
  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
