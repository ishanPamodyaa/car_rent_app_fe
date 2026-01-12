import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CarFilter {
  brand: string;
  fuelType: string;
  transmission: string;
}

@Component({
  selector: 'app-filter-car',
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-car.html',
  styleUrl: './filter-car.css',
  standalone: true
})
export class FilterCar {
  @Output() filterChange = new EventEmitter<CarFilter>();

  // Filter state
  selectedBrand = '';
  selectedFuelType = '';
  selectedTransmission = '';

  // Filter options
  brands = ['All Brands', 'Toyota', 'Honda', 'BMW', 'Mercedes-Benz', 'Audi', 'Ford', 'Nissan', 'Hyundai'];
  fuelTypes = ['All Fuel Types', 'Petrol', 'Diesel', 'Electric', 'Hybrid'];
  transmissions = ['All Transmissions', 'Automatic', 'Manual'];

  onFilterChange() {
    this.filterChange.emit({
      brand: this.selectedBrand,
      fuelType: this.selectedFuelType,
      transmission: this.selectedTransmission
    });
  }

  clearFilters() {
    this.selectedBrand = '';
    this.selectedFuelType = '';
    this.selectedTransmission = '';
    this.onFilterChange();
  }
}
