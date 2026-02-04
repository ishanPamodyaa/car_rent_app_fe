import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService, Booking } from '../../../core/services/customer.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-customer-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-bookings.component.html',
  styleUrl: './customer-bookings.component.css'
})
export class CustomerBookings implements OnInit {
  bookings: Booking[] = [];
  isLoading = true;

  constructor(
    private customerService: CustomerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadMyBookings();
  }

  loadMyBookings(): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.isLoading = true;
    this.customerService.getMyBookings(user.id).subscribe({
      next: (res) => {
        this.bookings = res;
        this.isLoading = false;
        console.log('Customer bookings loaded:', res);
      },
      error: (err) => {
        console.error('Error loading my bookings:', err);
        this.isLoading = false;
      }
    });
  }

  getStatusClass(status: string | undefined): string {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-700';
      case 'REJECTED': return 'bg-red-100 text-red-700';
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }
}
