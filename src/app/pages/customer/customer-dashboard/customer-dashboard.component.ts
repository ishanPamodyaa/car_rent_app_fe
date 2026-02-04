import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../core/services/customer.service';
import { AuthService } from '../../../core/services/auth.service';
import { FilterCar, CarFilter } from '../../admin/filter-car/filter-car';
import { Car } from '../../admin/add-car/add-car';
import { FormsModule } from '@angular/forms';
import { BookCar } from '../book-car/book-car.component';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, FilterCar, FormsModule, BookCar],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css',
})
export class CustomerDashboardComponent implements OnInit {
  allCars: Car[] = [];
  filteredCars: Car[] = [];
  selectedCar: Car | null = null;
  showCarModal = false;
  showBookingModal = false;

  constructor(
    private customerService: CustomerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.customerService.getAllCars().subscribe({
      next: (cars) => {
        this.allCars = cars;
        this.filteredCars = [...cars];
        console.log('Loaded cars:', cars);
      },
      error: (err) => {
        console.error('Error fetching cars:', err);
      }
    });
  }

  onFilterChange(filter: CarFilter): void {
    this.filteredCars = this.allCars.filter(car => {
      const brandMatch = !filter.brand || filter.brand === 'All Brands' || car.brand === filter.brand;
      const fuelMatch = !filter.fuelType || filter.fuelType === 'All Fuel Types' || car.fuelType === filter.fuelType;
      const transMatch = !filter.transmission || filter.transmission === 'All Transmissions' || car.transmission === filter.transmission;
      return brandMatch && fuelMatch && transMatch;
    });
  }

  onCarClick(car: Car): void {
    this.selectedCar = car;
    this.showCarModal = true;
  }

  closeCarModal(): void {
    this.showCarModal = false;
    this.selectedCar = null;
  }

  openBookingModal(): void {
    this.showCarModal = false;
    this.showBookingModal = true;
  }

  closeBookingModal(): void {
    this.showBookingModal = false;
    // We keep selectedCar so we can go back to it or finish booking
  }

  onBookingSuccess(): void {
    this.showBookingModal = false;
    this.selectedCar = null;
    // Maybe show success message or navigate to My Bookings
  }


  showImagePopup = false;
popupImageUrl: string | null = null;

openImagePopup(imageUrl: string) {
  this.popupImageUrl = imageUrl;
  this.showImagePopup = true;
}

closeImagePopup() {
  this.showImagePopup = false;
  this.popupImageUrl = null;
}


}
