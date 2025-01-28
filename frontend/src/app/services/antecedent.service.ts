import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AntecedentService {
  private apiUrl = 'http://localhost:3002/antecedents'; 

  constructor(private http: HttpClient) {}

  // Récupérer tous les antécédents
  getAntecedents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // Récupérer les consultations d'un patient spécifique via son NSS
  getAntecedentsByPatientNSS(patientNSS: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?patientNSS=${patientNSS}`);
  }
  // Ajouter un antécédent
  addAntecedent(antecedent: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, antecedent); 
  }
  

  // Supprimer un antécédent
  deleteAntecedent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  
}