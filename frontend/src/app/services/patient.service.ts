import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PatientService {
  
  private apiUrl = 'http://127.0.0.1:8000/patient'; 
  private BaseUrl = "http://127.0.0.1:8000/"

  constructor(private http: HttpClient) {}

  getPatients(page: number = 1, pageSize: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/?page=${page}&page_size=${pageSize}`);
  }
  
  
  // Ajouter un nouveau patient
  addDpiOrPatient(data: any): Observable<any> {
    const apiUrl = 'http://127.0.0.1:8000/dpi/'; 
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2MDAxMTgwLCJpYXQiOjE3MzU5OTkzODAsImp0aSI6ImI4YTFhZjQ3OTc5MDQ0NTI5YzViZTkwMzI2NjI2OTAwIiwidXNlcl9pZCI6MX0.LuLW3ru7nVA_HzafiJws4FDQRc_nUSR6sbUfAK4Tyug'; // Votre token JWT

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    return this.http.post<any>(apiUrl, data, { headers });
  }
  
  // Supprimer un patient par ID
  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }

  // Mettre à jour un patient
  updatePatient(patient: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${patient.num_securite_sociale}/`, patient);
  }

  // Récupérer les détails d'un patient par NSS
  getPatient(nss: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${nss}/`);
  }
  
}
