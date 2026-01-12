import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: any = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.loginObj).subscribe({
      next: (res) => {
        //alert("Login Successful!");
        const role = this.authService.getRole();
        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (role === 'CUSTOMER') {
          this.router.navigate(['/customer']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        alert('Login Failed: ' + (err.error?.message || 'Unknown error'));
        console.error(err);
      },
    });
  }
}
