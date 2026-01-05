import { Component } from '@angular/core';
import { UserRole } from '../../../core/models/user-role.enum';
import { AuthService } from '../../../core/services/auth.service';
import {  AdminNavbar as AdminNavbarComponent  } from "../../navbar/admin-navbar/admin-navbar";
import {  CustomerNavbar as CustomerNavbarComponent  } from "../../navbar/customer-navbar/customer-navbar";
import {  UserNavbar as UserNavbarComponent  } from "../../navbar/user-navbar/user-navbar";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [AdminNavbarComponent, CustomerNavbarComponent, UserNavbarComponent, RouterOutlet, CommonModule ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

  roles = UserRole;
  role: UserRole;

  constructor(private auth: AuthService) {
    this.role = this.auth.getRole();
  }
}
