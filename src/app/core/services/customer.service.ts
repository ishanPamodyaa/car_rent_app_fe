import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Booking {
  bookId?: number;
  fromDate: Date | string;
  toDate: Date | string;
  days: number;
  amount: number;
  bookCarStatus?: string;
  userId: number;
  email: string;
  userName: string;
  carName?: string;
  carId?: number;
}

export interface SearchCriteria {
  brand?: string;
  type?: string;
  transmission?: string;
  color?: string;
}

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private apiUrl = 'http://localhost:8080/api/customer';

  constructor(private http: HttpClient) {
    console.log('Customer Service Initialized');
  }

  getAllCars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }

  getCarById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Search-By-Id/${id}`);
  }

  bookCar(carId: number, booking: Booking): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Book-Car/${carId}`, booking);
  }

  getMyBookings(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/car/booking/${userId}`);
  }

  searchCars(criteria: SearchCriteria): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/search/car`, criteria);
  }
}
