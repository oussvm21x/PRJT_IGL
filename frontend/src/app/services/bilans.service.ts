import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BilanService {
  private apiUrl = 'http://localhost:3003/bilans'; // URL de l'API JSON Server

  constructor(private http: HttpClient) {}

  // Récupérer tous les bilans
  getBilans(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer un bilan spécifique par son ID
  getBilanById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Récupérer les bilans d'un patient spécifique via son NSS
  getBilansByNSS(nss: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?nss=${nss}`);
  }

  // Ajouter un nouveau bilan
  addBilan(bilan: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, bilan);
  }

  // Mettre à jour un bilan existant
  updateBilan(bilan: any): Observable<any> {
    const apiUrl = `http://localhost:3003/bilans/${bilan.id}`; 
    return this.http.put<any>(`${this.apiUrl}/${bilan.id}`, bilan);
  }

  // Supprimer un bilan
  deleteBilan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
