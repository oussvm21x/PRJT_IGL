import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultationService {
  private apiUrl = 'http://127.0.0.1:8000/consultations'; // URL de l'API JSON Server

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
  addConsultation(medcinId: string, patientNSS: string, consultation: any): Observable<any> {
    const url = `http://127.0.0.1:8000/consultations/create/${medcinId}/${patientNSS}`;
    return this.http.post<any>(url, consultation);
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
