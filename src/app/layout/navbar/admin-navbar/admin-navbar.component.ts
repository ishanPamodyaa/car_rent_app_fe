import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  imports: [RouterModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css',
  standalone: true
})
export class AdminNavbarComponent {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    console.log(this.auth.getRole());
    console.log(this.auth.isLoggedIn());
    console.log("Admin Navbar");
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
