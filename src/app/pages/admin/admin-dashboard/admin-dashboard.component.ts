import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCar, CarFilter } from '../filter-car/filter-car';
import { AddCar, Car } from '../add-car/add-car';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FilterCar, AddCar],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  standalone: true
})
export class AdminDashboardComponent {
  // Modal states
  showCarModal = false;
  showAddCarForm = false;
  selectedCar: Car | null = null;
  isEditMode = false;

  // Sample car data
  allCars: Car[] = [
    {
      id: 1,
      name: 'Corolla Altis',
      brand: 'Toyota',
      modelYear: 2023,
      color: 'White',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      mileage: 15.5,
      type: 'Car',
      rentalPrice: 5000,
      seats: 5,
      description: 'Premium sedan with excellent fuel efficiency and comfortable ride.',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'CR-V',
      brand: 'Honda',
      modelYear: 2024,
      color: 'Black',
      fuelType: 'Hybrid',
      transmission: 'Automatic',
      mileage: 18.2,
      type: 'SUV',
      rentalPrice: 7500,
      seats: 7,
      description: 'Spacious SUV with hybrid technology for better fuel economy.',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'X5',
      brand: 'BMW',
      modelYear: 2023,
      color: 'Blue',
      fuelType: 'Diesel',
      transmission: 'Automatic',
      mileage: 12.5,
      type: 'SUV',
      rentalPrice: 12000,
      seats: 5,
      description: 'Luxury SUV with premium features and powerful performance.',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'E-Class',
      brand: 'Mercedes-Benz',
      modelYear: 2024,
      color: 'Silver',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      mileage: 11.8,
      type: 'Car',
      rentalPrice: 15000,
      seats: 5,
      description: 'Executive sedan with cutting-edge technology and luxury.',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'i20',
      brand: 'Hyundai',
      modelYear: 2023,
      color: 'Red',
      fuelType: 'Petrol',
      transmission: 'Manual',
      mileage: 20.5,
      type: 'Car',
      rentalPrice: 3500,
      seats: 5,
      description: 'Compact hatchback perfect for city driving with great mileage.',
      image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=500&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Mustang',
      brand: 'Ford',
      modelYear: 2023,
      color: 'Yellow',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      mileage: 10.2,
      type: 'Car',
      rentalPrice: 18000,
      seats: 4,
      description: 'Iconic sports car with powerful engine and stunning design.',
      image: 'https://images.unsplash.com/photo-1584345604476-8ec5f5d9d6f8?w=500&h=300&fit=crop'
    }
  ];

  filteredCars: Car[] = [...this.allCars];

  // Filter handler
  onFilterChange(filter: CarFilter) {
    this.filteredCars = this.allCars.filter(car => {
      const brandMatch = !filter.brand || filter.brand === 'All Brands' || car.brand === filter.brand;
      const fuelMatch = !filter.fuelType || filter.fuelType === 'All Fuel Types' || car.fuelType === filter.fuelType;
      const transMatch = !filter.transmission || filter.transmission === 'All Transmissions' || car.transmission === filter.transmission;
      return brandMatch && fuelMatch && transMatch;
    });
  }

  // Car card click - show modal
  onCarClick(car: Car) {
    this.selectedCar = car;
    this.showCarModal = true;
  }

  // Close car details modal
  closeCarModal() {
    this.showCarModal = false;
    this.selectedCar = null;
  }

  // Open add car form
  openAddCarForm() {
    this.isEditMode = false;
    this.selectedCar = null;
    this.showAddCarForm = true;
  }

  // Open edit car form
  openEditCarForm() {
    this.isEditMode = true;
    this.showAddCarForm = true;
    this.showCarModal = false;
  }

  // Close add/edit form
  closeAddCarForm() {
    this.showAddCarForm = false;
    this.selectedCar = null;
    this.isEditMode = false;
  }

  // Save car (add or edit)
  onSaveCar(car: Car) {
    if (this.isEditMode && this.selectedCar) {
      // Update existing car
      const index = this.allCars.findIndex(c => c.id === this.selectedCar!.id);
      if (index !== -1) {
        this.allCars[index] = car;
      }
    } else {
      // Add new car
      this.allCars.push(car);
    }
    this.filteredCars = [...this.allCars];
    this.closeAddCarForm();
  }

  // Delete car
  onDeleteCar() {
    if (this.selectedCar && confirm('Are you sure you want to delete this car?')) {
      this.allCars = this.allCars.filter(c => c.id !== this.selectedCar!.id);
      this.filteredCars = [...this.allCars];
      this.closeCarModal();
    }
  }
}
