import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {

  registerObj: any = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router, private authService: AuthService) {}

  onSignUp() {
    if(this.registerObj.password !== this.registerObj.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    this.authService.register(this.registerObj).subscribe({
      next: (res) => {
        alert("Registration Successful!");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert("Registration Failed: " + (err.error?.message || "Unknown error"));
        console.error(err);
      }
    });
  }
}
