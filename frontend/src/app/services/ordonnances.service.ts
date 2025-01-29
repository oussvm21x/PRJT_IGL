import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdonnancesService {
  private baseUrl = 'http://localhost:3000/ordonnances'; // Remplacez par l'URL réelle de votre API

  constructor(private http: HttpClient) { }

  // Get all ordonnances
  getAllOrdonnances(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // Récupérer toutes les ordonnances d'un patient
  getOrdonnancesByPatientId(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patient/${patientId}`);
  }

  // Ajouter une nouvelle ordonnance
  addOrdonnance(ordonnanceData: any): Observable<any> {
    // Assign the numeroOrdonnance as the id
    ordonnanceData.id = ordonnanceData.numeroOrdonnance;  // Set the id to the numeroOrdonnance value

    return this.http.post<any>(this.baseUrl, ordonnanceData);  // POST request to add ordonnance
  }


  // Supprimer une ordonnance

  deleteOrdonnance(ordonnanceId: string): Observable<any> {
    // Ensure this URL matches your backend's expectations (using 'id' or 'numeroOrdonnance')
    return this.http.delete<any>(`${this.baseUrl}/${ordonnanceId}`);
  }

  updateOrdonnance(ordonnance: any): Observable<any> {
    // Assuming 'numeroOrdonnance' is the identifier
    return this.http.put<any>(`${this.baseUrl}/${ordonnance.numeroOrdonnance}`, ordonnance);  // PUT request to update ordonnance
  }



}
