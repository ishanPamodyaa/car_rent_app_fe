import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-customer-navbar',
  imports: [RouterModule],
  templateUrl: './customer-navbar.component.html',
  styleUrl: './customer-navbar.component.css',
  standalone: true
})
export class CustomerNavbar {
  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
