import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RadioService {
  private apiUrl = 'http://localhost:3005/radios'; // URL de l'API JSON Server pour les radios

  constructor(private http: HttpClient) {}

  // Récupérer toutes les radios
  getRadios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer une radio spécifique par son ID
  getRadioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Ajouter une nouvelle radio
  addRadio(radio: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, radio);
  }

  // Mettre à jour une radio existante
  updateRadio(radio: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${radio.id}`, radio);
  }

  // Supprimer une radio
  deleteRadio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Télécharger une image pour une radio
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }

  // Filtrer les radios par NSS
  getRadiosByNSS(nss: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?nss=${nss}`);
  }
}
