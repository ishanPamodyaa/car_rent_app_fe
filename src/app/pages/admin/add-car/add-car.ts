import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { ImageService } from '../../../core/services/image.service';

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
export class AddCar implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() carData: Car | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Car>();

  constructor(
    private adminService: AdminService,
    private imageService: ImageService
  ) {}

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
  selectedFile: File | null = null;
  currentYear = new Date().getFullYear();

  // Dropdown options
  brands = ['Toyota', 'Honda', 'BMW', 'Mercedes-Benz', 'Audi', 'Ford', 'Nissan', 'Hyundai'];
  fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  transmissions = ['Automatic', 'Manual'];
  carTypes = ['SUV', 'Car', 'Cab'];

  ngOnInit() {
    this.populateForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Detect when carData input changes and populate the form
    if (changes['carData']) {
      this.populateForm();
    }
  }

  private populateForm() {
    if (this.carData) {
      this.carForm = { ...this.carData };
      this.imagePreview = this.carData.image;
      this.selectedFile = null; // Reset file selection when editing
    } else {
      // Reset form for adding new car
      this.resetForm();
    }
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        // Set temp image for validation to pass
        this.carForm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.isValidForm()) {
      if (this.selectedFile) {
        this.imageService.uploadImage(this.selectedFile).subscribe({
          next: (imageUrl) => {
            console.log('Image uploaded successfully:', imageUrl);
            this.saveCar(imageUrl);
          },
          error: (error) => {
            console.error('Error uploading image:', error);
            // Handle upload error (maybe show a notification)
          }
        });
      } else {
        // Edit mode or no new image selected, use existing image URL
        // If it's a new car and no image is selected, isValidForm should prevent this,
        // but if image is optional or we have a default/placeholder logic, handle it here.
        // Assuming carForm.image has the old URL if editing.
        this.saveCar(this.carForm.image || '');
      }
    }
  }

  private saveCar(imageUrl: string) {
    const carToSave: Car = {
      id: this.carData?.id ?? 0,
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
      image: imageUrl
    };

    console.log('Car to save:', carToSave);

    // Check if we're editing an existing car or adding a new one
    const serviceCall = this.carData
      ? this.adminService.updateCar(carToSave.id, carToSave)
      : this.adminService.postCar(carToSave);

    serviceCall.subscribe({
      next: (response) => {
        console.log('Car saved successfully:', response);
        this.save.emit(response);
        this.resetForm();
      },
      error: (error) => {
        console.error('Error saving car:', error);
      }
    });
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
      this.carForm.rentalPrice !== null &&
      this.carForm.rentalPrice !== undefined &&
      this.carForm.seats !== null &&
      this.carForm.seats !== undefined &&
      this.carForm.mileage !== null &&
      this.carForm.mileage !== undefined &&
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
