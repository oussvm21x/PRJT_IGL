import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RadioService {
  private apiUrl = 'http://localhost:3005/radios'; // Remplacez par l'URL de votre API backend

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les radios
  getRadios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/radios`);
  }

  // Méthode pour uploader une image de radio
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/radios/upload`, formData);
  }

  // (Optionnel) Méthode pour récupérer les détails d'une radio spécifique
  getRadioDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/radios/${id}`);
  }
}
