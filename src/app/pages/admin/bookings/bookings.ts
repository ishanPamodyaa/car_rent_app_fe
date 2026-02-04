import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.html',
  styleUrl: './bookings.css',
})
export class Bookings implements OnInit {
  bookings: any[] = [];
  isLoading = true;
  selectedCar: any = null;
  showModal = false;

  // Popup states
  showSuccessPopup = false;
  showErrorPopup = false;
  popupMessage = '';
  popupType: 'success' | 'error' = 'success';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.isLoading = true;
    this.adminService.getCarBookings().subscribe({
      next: (res) => {
        this.bookings = res;
        this.isLoading = false;
        console.log('Bookings loaded:', res);
        if (res.length > 0) {
          console.log('First booking object details:', JSON.stringify(res[0], null, 2));
          console.log('First booking carId value:', res[0].carId);
        }
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
        this.isLoading = false;
      }
    });
  }

  approveBooking(id: number): void {
    this.adminService.changeBookingStatus(id, 'APPROVED').subscribe({
      next: () => {
        this.showPopup('Booking approved successfully!', 'success');
        this.loadBookings();
      },
      error: (err) => {
        console.error('Error approving booking:', err);
        const errorMessage = err.error?.message || 'Error approving booking. The vehicle may already be booked for overlapping dates.';
        this.showPopup(errorMessage, 'error');
      }
    });
  }

  rejectBooking(id: number): void {
    this.adminService.changeBookingStatus(id, 'REJECT').subscribe({
      next: () => {
        this.showPopup('Booking rejected.', 'success');
        this.loadBookings();
      },
      error: (err) => {
        console.error('Error rejecting booking:', err);
        this.showPopup('Error rejecting booking. Please try again.', 'error');
      }
    });
  }

  showPopup(message: string, type: 'success' | 'error'): void {
    this.popupMessage = message;
    this.popupType = type;
    if (type === 'success') {
      this.showSuccessPopup = true;
      setTimeout(() => {
        this.showSuccessPopup = false;
      }, 2500);
    } else {
      this.showErrorPopup = true;
      setTimeout(() => {
        this.showErrorPopup = false;
      }, 3500);
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-700';
      case 'REJECT': return 'bg-red-100 text-red-700'; // Backend uses REJECT
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  viewCar(booking: any): void {
    console.log('Viewing car details for booking:', booking);
    console.log('carId from booking object:', booking.carId);
    const carId = booking.carId;

    if (!carId) {
      console.error('Car ID is missing in booking object. Full booking:', JSON.stringify(booking, null, 2));
      return;
    }
    this.adminService.getCarById(carId).subscribe({
      next: (car) => {
        this.selectedCar = car;
        this.showModal = true;
      },
      error: (err) => console.error('Error fetching car details:', err)
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedCar = null;
  }
}
