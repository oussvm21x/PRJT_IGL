import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/patients'; // Remplacez par votre URL de l'API

  constructor(private http: HttpClient) {}

  // Récupérer les patients
  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Ajouter un patient
  addPatient(patient: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, patient);
  }

  // Supprimer un patient
  deletePatient(nss: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${nss}`);
  }

  // Modifier un patient (optionnel)
  updatePatient(patient: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${patient.nss}`, patient);
  }
}
