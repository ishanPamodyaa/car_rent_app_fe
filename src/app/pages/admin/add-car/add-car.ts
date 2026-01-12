import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Car {
  id: number;
  name: string;
  brand: string;
  modelYear: number;
  color: string;
  fuelType: string;
  transmission: string;
  mileage: number;
  type: string;
  rentalPrice: number;
  seats: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-add-car',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-car.html',
  styleUrl: './add-car.css',
  standalone: true
})
export class AddCar {
  @Input() isOpen = false;
  @Input() carData: Car | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Car>();

  // Form model
  carForm: Partial<Car> = {
    name: '',
    brand: '',
    modelYear: new Date().getFullYear(),
    color: '',
    fuelType: '',
    transmission: '',
    mileage: 0,
    type: '',
    rentalPrice: 0,
    seats: 4,
    description: '',
    image: ''
  };

  imagePreview: string = '';
  currentYear = new Date().getFullYear();

  // Dropdown options
  brands = ['Toyota', 'Honda', 'BMW', 'Mercedes-Benz', 'Audi', 'Ford', 'Nissan', 'Hyundai'];
  fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  transmissions = ['Automatic', 'Manual'];
  carTypes = ['SUV', 'Car', 'Cab'];

  ngOnInit() {
    if (this.carData) {
      this.carForm = { ...this.carData };
      this.imagePreview = this.carData.image;
    }
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.carForm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.isValidForm()) {
      const carToSave: Car = {
        id: this.carData?.id || Date.now(),
        name: this.carForm.name!,
        brand: this.carForm.brand!,
        modelYear: this.carForm.modelYear!,
        color: this.carForm.color!,
        fuelType: this.carForm.fuelType!,
        transmission: this.carForm.transmission!,
        mileage: this.carForm.mileage!,
        type: this.carForm.type!,
        rentalPrice: this.carForm.rentalPrice!,
        seats: this.carForm.seats!,
        description: this.carForm.description!,
        image: this.carForm.image!
      };
      this.save.emit(carToSave);
      this.resetForm();
    }
  }

  onCancel() {
    this.resetForm();
    this.close.emit();
  }

  private isValidForm(): boolean {
    return !!(
      this.carForm.name &&
      this.carForm.brand &&
      this.carForm.modelYear &&
      this.carForm.color &&
      this.carForm.fuelType &&
      this.carForm.transmission &&
      this.carForm.type &&
      this.carForm.rentalPrice &&
      this.carForm.image
    );
  }

  private resetForm() {
    this.carForm = {
      name: '',
      brand: '',
      modelYear: new Date().getFullYear(),
      color: '',
      fuelType: '',
      transmission: '',
      mileage: 0,
      type: '',
      rentalPrice: 0,
      seats: 4,
      description: '',
      image: ''
    };
    this.imagePreview = '';
  }
}
