import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService, Booking } from '../../../core/services/customer.service';
import { AuthService } from '../../../core/services/auth.service';
import { Car } from '../../admin/add-car/add-car';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-car',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.css',
})
export class BookCar implements OnInit {
  @Input() isOpen = false;
  @Input() car: Car | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();

  fromDate: string = '';
  toDate: string = '';
  totalDays: number = 0;
  totalAmount: number = 0;
  isSubmitting = false;
  errorMessage = '';
  showSuccessPopup = false;
  minDate: string = new Date().toISOString().split('T')[0]; // Today's date

  constructor(private customerService: CustomerService, private authService: AuthService) {}

  ngOnInit(): void {
    // Initialize dates with today and tomorrow
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    this.fromDate = today.toISOString().split('T')[0];
    this.toDate = tomorrow.toISOString().split('T')[0];
    this.calculateBooking();
  }

  calculateBooking(): void {
    if (!this.fromDate || !this.toDate || !this.car) return;

    const start = new Date(this.fromDate);
    const end = new Date(this.toDate);

    if (end < start) {
      this.totalDays = 0;
      this.totalAmount = 0;
      return;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    this.totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (this.totalDays === 0) this.totalDays = 1; // Minimum 1 day

    this.totalAmount = this.totalDays * this.car.rentalPrice;
  }

  onSubmit(): void {
    if (!this.car) return;

    const user = this.authService.getCurrentUser();
    if (!user) {
      this.errorMessage = 'Please log in to book a vehicle.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const booking: Booking = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      days: this.totalDays,
      amount: this.totalAmount,
      userId: user.id,
      email: user.email,
      userName: user.userName || user.email.split('@')[0],
    };

    this.customerService.bookCar(this.car.id, booking).subscribe({
      next: () => {
        this.isSubmitting = false;
        // Show popup ONLY on success
        this.showSuccessPopup = true;

        setTimeout(() => {
          this.showSuccessPopup = false;
          this.success.emit(); // Emit success after popup is shown
          this.onCancel();
        }, 2500);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || err.error?.massage || 'Failed to submit booking. Please check availability.';
      }
    });
  }

  onCancel(): void {
    this.close.emit();
  }
}
