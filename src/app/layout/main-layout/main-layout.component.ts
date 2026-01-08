import { Component } from '@angular/core';
import { UserRole } from '../../core/models/user-role.enum';
import { AuthService } from '../../core/services/auth.service';
import {  AdminNavbarComponent  } from "../navbar/admin-navbar/admin-navbar.component";
import {  CustomerNavbar as CustomerNavbarComponent  } from "../navbar/customer-navbar/customer-navbar.component";
import {  UserNavbar as UserNavbarComponent  } from "../navbar/user-navbar/user-navbar.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [AdminNavbarComponent, CustomerNavbarComponent, UserNavbarComponent, RouterOutlet, CommonModule, FooterComponent ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {

  roles = UserRole;
  role: UserRole;

  constructor(private auth: AuthService) {
    this.role = this.auth.getRole();
  }
}
