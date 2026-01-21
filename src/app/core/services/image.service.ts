import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class ImageService {

    private apiUrl = 'http://localhost:8080/api/images';
    constructor(private http: HttpClient) {
        console.log("Image Service Initialized");
    }

    uploadImage(file: File): Observable<string> {
      const formData = new FormData();
      formData.append('file', file);

      return this.http.post(this.apiUrl + '/upload', formData, {
        responseType: 'text'
      });
    }


}
