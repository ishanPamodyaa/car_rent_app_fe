import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Car } from "../../pages/admin/add-car/add-car";


@Injectable({ providedIn: 'root' })
export class AdminService {

  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http:HttpClient){
    console.log("Admin Service Initialize")
  }

  postCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.apiUrl}/car`, car);
  }

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/getAll`);
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/car/${id}`);
  }

  deleteCarById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/car/${id}`);
  }

  updateCar(id: number, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/car/${id}`, car);
  }

  searchCars(query: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/search`, { params: { q: query } });
  }

}
