import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultationService {
  private apiUrl = 'http://localhost:3001/consultations'; // URL de l'API JSON Server

  constructor(private http: HttpClient) {}

  // Récupérer toutes les consultations
  getConsultations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer les consultations d'un patient spécifique via son NSS
  getConsultationsByPatientNSS(patientNSS: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?patientNSS=${patientNSS}`);
  }

  // Ajouter une consultation
  addConsultation(consultation: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, consultation);
  }

  // Mettre à jour une consultation
  updateConsultation(id: string, consultation: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, consultation);
  }

  // Supprimer une consultation
  deleteConsultation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}